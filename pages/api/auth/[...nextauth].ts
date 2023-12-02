import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../models/User'
import { compare } from 'bcryptjs'
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../utils/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_ID,
      clientSecret: process.env.NEXT_GOOGLE_SECRET,
      async authorize(credentials, req) {
        const result = await User.findOne({ email: credentials.email })
        if (!result) {
          throw new Error('Nema korisnika sa ovim e-mailom')
        }

        const equalPasswords = await compare(credentials.password, result.password)

        if (!equalPasswords || result.email !== credentials.email) {
          throw new Error('Korisnicko ime ili sifra se ne poklapa')
        }
        console.log(result, 'result')
        return result;
      },
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const result = await User.findOne({ email: credentials.email })
        if (!result) {
          throw new Error('Nema korisnika sa ovim e-mailom')
        }

        const equalPasswords = await compare(credentials.password, result.password)

        if (!equalPasswords || result.email !== credentials.email) {
          throw new Error('Korisnicko ime ili sifra se ne poklapa')
        }
        console.log(result, 'result')
        return result;
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  //   // error: '/auth/error',
  //   // signOut: '/auth/signout'
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user, 'user sign')
      return true;
    },

    async session({ session, token, user  }) {
      session.user._id = token.sub;
      // console.log(session, 'session')
      // console.log(token, 'token')
      // console.log(user, 'user')
      return session;
      }, 
  },
  secret: '7aiYsX0GKxOyjwJEiuEGLPWoWIJeSSBOx+vgqx8ABlM='
};

export default NextAuth(authOptions);