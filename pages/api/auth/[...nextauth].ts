/* eslint-disable import/no-anonymous-default-export */
import NextAuth, { NextAuthOptions, User } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
let userAccount:
  | Omit<User, "id">
  | PromiseLike<Omit<User, "id"> | { id?: string | undefined } | null>
  | null = null;

const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const confirmPasswordHash = (plainPassword: any, hashedPassword: string) => {
  return new Promise((resolve) => {
    bcrypt.compare(
      plainPassword,
      hashedPassword,
      function (err: any, res: any) {
        resolve(res);
      }
    );
  });
};

const options = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await prisma.users.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (user !== null) {
            //Compare the hash
            const res = await confirmPasswordHash(
              credentials.password,
              user.password
            );
            if (res === true) {
              userAccount = {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isActive: user.isActive,
              };

              return userAccount;
            } else {
              console.log("Hash not matched logging in");
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      console.log('token', token)
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  // Setting token in session
      console.log('session', session)
      return session;
    },
  },
  pages: {
    signIn: "/", //Need to define custom login page (if using)
    
  },
};
export default (req, res) => NextAuth(req, res, options);
