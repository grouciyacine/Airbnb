import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/Prismadb'
import { authOptions } from "../../../pages/api/auth/[...nextauth]"

export async function GET() {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        throw new Error('Not signed in !!')
    } 
    const currentUser=await prisma.user.findUnique({where:{email:session.user.email}})
    const {password,...others}:any=currentUser
    return NextResponse.json({ others  });
}