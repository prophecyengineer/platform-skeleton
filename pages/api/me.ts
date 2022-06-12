import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'
// make a stream on the server side!!
// react hook for data fetching
import useSWR from 'swr'
import fetcher from './fetcher'
const stream = require('getstream');

const client = stream.connect(
  process.env.REACT_APP_STREAM_API_KEY,
  process.env.REACT_APP_STREAM_APP_ID,
  { location: 'us-east' },
);



export default validateRoute(async (req, res, user) => {
  const makeStream = await prisma.users.findUnique({
    where: {
      username: user.username,
    },
  })

  const appToken = client.createUserToken(user.username);


  console.log('make a fucking user token!', appToken)
  res.json({  ...user, appToken, makeStream })
//   res.json({ ...user, appToken })
})
