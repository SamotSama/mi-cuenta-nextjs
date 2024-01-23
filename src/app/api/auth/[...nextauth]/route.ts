import prisma from '@/../prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize (credentials) {
        if (!credentials) return null
        const { email, password } = credentials

        const user = await prisma.usuarios.findUnique({ where: { usuario: email } })
        if (!user) return null

        const validPassword = bcrypt.compareSync(password, user.hashedPassword)
        return validPassword ? user : null
      }
    })
  ],
  pages: {
    // Aca va la ruta donde tenes el login
    signIn: "/login",
    // signOut: "/auth/signout"
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode ({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode")
      }
      return jwt.sign(token, secret)
    },
    async decode ({ token, secret }) {
      if (!token) {
        throw new Error("No token to decode")
      }
      const decodedToken = jwt.verify(token, secret)
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken)
      } else {
        return decodedToken
      }
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session (params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email
      }
      return params.session
    },
    async jwt (params: {
      token: JWT,
      user?: User | undefined,
      account?: Account | null | undefined,
      profile?: Profile | undefined,
      isNewUser?: boolean | undefined
    }) {
      if (params.user) {
        params.token.email = params.user.email
      }

      return params.token
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };

