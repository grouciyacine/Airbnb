import prisma from '@/app/libs/Prismadb'
import { NextResponse,NextRequest } from 'next/server'

export const GET=async(req:NextRequest, res:NextResponse)=>{
    try{
        const params=req.nextUrl.searchParams
        const id=params.get('id') as string
        if(id){
            const getUser=await prisma.user.findUnique({where:{id:id}})
            return NextResponse.json(getUser,{status:200})
        }else{
            return NextResponse.json('No User Have Found',{status:500})
        }
        
    }catch(err){
        return NextResponse.json(err,{status:500})
    }
}