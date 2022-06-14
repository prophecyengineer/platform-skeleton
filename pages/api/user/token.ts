import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";
// make a stream on the server side!!
// react hook for data fetching
import useSWR from "swr";
import fetcher from "./fetcher";
const stream = require("getstream");

const client = stream.connect(
  process.env.REACT_APP_STREAM_API_KEY,
  process.env.REACT_APP_STREAM_APP_ID,
  { location: "us-east" }
);

export default validateRoute(async (req, res, user) => {
  const makeStream = await prisma.users.findUnique({
    where: {
      username: user.username,
    },
  });

  const userId = req.cookies.USERNAME;

  console.log("userID made in API", userId);

  const appToken = client.createUserToken(userId);

  // const newUser = client.user('sushi').create({
  //   name: "Sushi",
  //   occupation: "Piece Sushi",
  //   gender: "female",
  // });

  // appToken = process.env.USERNAME

  // res.json({ appToken, userId,  makeStream });

  res.json({ ...user });
});
