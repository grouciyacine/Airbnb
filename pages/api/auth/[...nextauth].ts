import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Prisma from "@/app/libs/Prismadb";
import { AuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from "next-auth/next";
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(Prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: "text" },
                password: { label: 'password', type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error(`Credentials should be`)
                }
                const user = await Prisma.user.findUnique({ where: { email: credentials.email } })
                if (!user) {
                    throw new Error(`User not found: ${credentials.email}`)
                }
                const verifyPassword = bcrypt.compareSync(credentials.password, user.password as string)
                if (!verifyPassword) {
                    throw new Error(`Password not Correct`)
                }
                return user
            }
        })
    ],
    pages: {
        signIn: "/"
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn(params) {
            const { user, account, profile } = params;
            console.log("zzzzzzz"+user.image )
            const existingUser = await Prisma.user.findUnique({
                where: { email: user.email as string },
            });
                console.log(existingUser)
            if (existingUser && user.image as string) {
                // Update the user's image if it exists in the profile
                await Prisma.user.update({
                    where: { email: user.email as string },
                    data: { image: user.image as string },
                });
            }
            return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
}
const handler = NextAuth(authOptions)
export default NextAuth(authOptions);