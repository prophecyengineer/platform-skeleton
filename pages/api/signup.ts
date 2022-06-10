// hashes password
import bcrypt from 'bcrypt';
// JWT token to store info about user, user permissions, etc.
import jwt from 'jsonwebtoken';
// store memory in browser session
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

// this is a serverless function (a function executed by some event)
// function will start up and then shut down when the event is triggered

// user sends us email and pass, we attempt to create new user in db
// if user exists, we return error
// if successful we retrieve a cookie, the cookie is sent on every other request to verify user
// eslint-disable-next-line import/no-anonymous-default-export
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
