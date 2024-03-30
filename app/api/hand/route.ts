// File: path-to-your-api-route/your-api-route.js
import { getServerSession } from "next-auth";
import prisma from '@/app/libs/Prismadb'
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req:Request, res:Response) {
    try {
        const session = await getServerSession(authOptions);
        
        
        if (!session?.user?.email) {
            throw new Error('Not signed in !!');
        }
        // Use the provided id parameter to query the user
        const currentUser = await prisma.user.findUnique({ where: { email:session?.user?.email } });
        if (!currentUser) {
            throw new Error('User not found!');
        }
        const { password, ...others } = currentUser;
        return {others}
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: 'Internal Server Error' });
    }
}
