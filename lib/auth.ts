import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";

const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    //runs on login
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }
      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }
      if (!isTryingToAccessApp) {
        return true;
      }
    },
  },
};
export const { auth, signIn } = NextAuth(authOptions);
