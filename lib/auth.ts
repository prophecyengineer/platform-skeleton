import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

// middleware gatekeeper, higher order function
// checks for token, checks it is valid, checks for user
export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // req.cookie gives us access to token
    const token = req.cookies.AUDIT_ACCESS_TOKEN

    // if token, make a user
    // we use try catch because we don't want whole api to crash 
    if (token) {
      let user

      try {
        // when we signed token we did so with email, id and time
        // we pass in secret phrase too
        const { id } = jwt.verify(token, 'hello')
        // atempt to find user in db
        user = await prisma.users.findUnique({
          where: { id},
        
        })
        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authoooorizied' })
        return
      }  

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorissszied' })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello')
  return user
}
