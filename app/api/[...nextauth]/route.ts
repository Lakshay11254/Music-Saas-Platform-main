import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "../lib/db";
import { Provider } from "@prisma/client";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
       async signIn(params){
                console.log(params);
                try
                {
                    await prismaClient.user.create({
                        data: {
                            email: "",
                            Provider: "Google",
                    }
                });
                }
                catch(e)
                {
                    console.log(e);
                }
                return true;
            }}
})