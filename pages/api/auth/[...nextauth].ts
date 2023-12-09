import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../models/User'
import { compare } from 'bcryptjs'
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../utils/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

interface Credentials {
  email: string
  password: string
  // Add other properties if necessary
}

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {

        // can you define the typing of credentials here!!! not in the brackets
        const typedCredentials = credentials as Credentials;

        if (!typedCredentials || !typedCredentials.email) {
          // Handle missing or invalid credentials
          return null;
        }

        const result = await User.findOne({ email: typedCredentials.email })
        if (!result) {
          throw new Error('Nema korisnika sa ovim e-mailom')
        }

        const equalPasswords = await compare(typedCredentials.password, result.password)

        if (!equalPasswords || result.email !== typedCredentials.email) {
          throw new Error('Korisnicko ime ili sifra se ne poklapa')
        }
        console.log(result, 'result')
        return result;
      }


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

    async session({ session, token, user }) {
      // Use optional chaining and type assertions
      const userId = token?.sub as string | undefined;

      if (session && session.user && userId) {
        // Assign the user ID to session.user._id
        session.user._id = userId;
      }
      return session;
    },
  },
  secret: '7aiYsX0GKxOyjwJEiuEGLPWoWIJeSSBOx+vgqx8ABlM='
};

export default NextAuth(authOptions);