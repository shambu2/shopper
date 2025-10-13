import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
// import {prisma} from "@/lib/prismaClient";
// import { Prisma } from "./generated/prisma";
import { PrismaClient } from "./generated/prisma";
import type { Session } from "next-auth";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment vaiables");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email || !profile.name) return false;
      await prisma.user.upsert({
        where: { email: profile.email },
        update: {
          // googleId: profile.id,
          name: profile.name ?? "",
          email: profile.email,
        },
        create: {
          googleId: profile.sub!,
          name: profile.name,
          email: profile.email,
        },
      });
      return true;
    },

    async session({ session, token }: { session: Session; token: any }) {
      if (session.user?.email) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (user) {
          session.user.id = user.id?.toString();
        }
      }
      return session;
    },
  },
};
