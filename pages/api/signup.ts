/* eslint-disable import/no-anonymous-default-export */
// hashes password
import bcrypt from 'bcrypt';
// JWT token to store info about user, user permissions, etc.
import jwt from 'jsonwebtoken';
// store memory in browser session
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
const stream = require('getstream');

// this is a serverless function (a function executed by some event)
// function will start up and then shut down when the event is triggered

// user sends us email and pass, we attempt to create new user in db
// if user exists, we return error
// if successful we retrieve a cookie, the cookie is sent on every other request to verify user
// eslint-disable-next-line import/no-anonymous-default-export

const client = stream.connect(
  process.env.REACT_APP_STREAM_API_KEY,
  process.env.REACT_APP_STREAM_KEY_SECRET,
  process.env.REACT_APP_STREAM_APP_ID,
  { location: 'us-east' },
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { username, email, password } = req.body;

  let user;
  console.log({ username, email, password });
  try {
    user = await prisma.users.create({
      data: {
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      },    
    }); 
  } catch (e) {
    res.status(401);
    res.json({ error: e });
    return;
  }

  await client.setUser({
    name: user.username, 
    occupation: 'Software Engineer',
    gender: 'male'
});

console.log('user in getstream', client.user)
  // the object that you want to hash
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    'hello',
    { expiresIn: '8h' }
  );

  
// For the feed group 'user' and user id 'eric' get the feed
// The user token is generated server-side for this user
const ericFeed = client.feed('user', 'eric', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6InVzZXJlcmljIn0.j-h_2c4CZ9s0Cln_7gW7xokIs0utDqXZ7DrUhN1hX-A');

// Add the activity to the feed
ericFeed.addActivity({
  actor: 'SU:eric',
  tweet: 'Hello world', 
  verb: 'tweet', 
  object: 1
});

  // set jwt on a cookie, gets set into the persons browser -not local storage
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  res.json(user);



};


