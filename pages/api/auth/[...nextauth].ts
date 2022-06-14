/* eslint-disable import/no-anonymous-default-export */
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from 'next';
let userAccount: Omit<User, "id"> | PromiseLike<Omit<User, "id"> | { id?: string | undefined; } | null> | null = null;

const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

const confirmPasswordHash = (plainPassword: any, hashedPassword: string) => {
    return new Promise(resolve => {
        bcrypt.compare(plainPassword, hashedPassword, function(err: any, res: any) {
            resolve(res);
        });
       
    })
}

const options = {
    cookie: {
        secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {},
            async authorize(credentials : any) {
                try
                {
                    const user = await prisma.users.findFirst({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (user !== null)
                    {
                        //Compare the hash
                        const res = await confirmPasswordHash(credentials.password, user.password);
                        if (res === true)
                        {
                            userAccount = {
                                userId: user.userId,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                isActive: user.isActive
                            };

                            return userAccount;
                        }
                        else
                        {
                            console.log("Hash not matched logging in");
                            return null;
                        }
                    }
                    else {
                        return null;
                    }
                }
                catch (err)
                {
                    console.log("Authorize error:", err);
                }

            }
        }),
    ],
    callbacks: {
        async signIn(user: { user: any; userId: any; isActive: string; }, account: any, profile: any) {
            try
            {

                //the user object is wrapped in another user object so extract it
                user = user.user;
                console.log("Sign in callback", user);
                console.log("User id: ", user.userId)
                if (typeof user.userId !== typeof undefined)
                {

                    if (user.isActive === '1')
                    {
                        console.log("User is active");
                        return user;
                    }
                    else
                    {
                        console.log("User is not active")
                        return false;
                    }
                }
                else
                {
                    console.log("User id was undefined")
                    return false;
                }
            }
            catch (err)
            {
                console.error("Signin callback error:", err);
            }

        },
        async register(firstName: any, lastName: any, email: any, password: any) {
            try
            {
                await prisma.users.create({
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    }
                })
                return true;
            }
            catch (err)
            {
                console.error("Failed to register user. Error", err);
                return false;
            }

        },
        async session(session, token) {
          if (userAccount !== null)
          {
              session.user = userAccount;
          }
          else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined 
              || (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined)))
          {
              session.user = token.user;
          }
          else if (typeof token !== typeof undefined)
          {
              session.token = token;
          }
          return session;
      },
      async jwt(token, user, account, profile, isNewUser) {
          console.log("JWT callback. Got User: ", user);
          if (typeof user !== typeof undefined)
          {
              token.user = user;
          }
          return token;
      }
  }
}
export default (req, res) => NextAuth(req, res, options)