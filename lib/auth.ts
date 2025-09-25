import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import {prisma} from "@/lib/prismaClient";
import type { Session } from "next-auth";

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

if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("Missing Google OAuth environment vaiables")
}

export const authOptions:NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async signIn({profile}){
            if(!profile?.email) return false;
            await prisma.user.upsert({
                where: {email: profile.email},
                update: {
                    // googleId: profile.id,
                    name: profile.name,
                    email: profile.email

                },
                create: {
                    name: profile.name,
                    email: profile.email
                },
            });
            return true
        },

        async session({session}){
            if(session.user?.email){
                const user = await prisma.user.findunique({
                    where: {email: session.user.email}
                });
                session.user.id  = user?.id;

            }
            return session;

        }
    }
}

