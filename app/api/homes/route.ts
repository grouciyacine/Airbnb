import {NextApiResponse,NextApiRequest} from 'next'
import prisma from '@/app/libs/Prismadb'
import { NextResponse } from 'next/server';
import handler from '../hand/route';
export const POST=async(req:Request,res:Response)=>{
    try{
    const body=await req.json();
    const {title,type,price,description,imagesrc,roomAccount,bathroomAccount,gestCount,locationValue,location }:any=body
    const user=await handler(req, res) as string | any
    await prisma.listings.create({data:{
        title:title,description,imagesrc,roomAccount,bathroomAccount,gestCount,locationValue:locationValue,userId :user?.others?.id,price,type,location
    }})
return NextResponse.json({"success":"Data saved successfully"},{status:200})
    }catch(err){
        console.log(err)
    }

}
export const GET=async(req:Request,res:Response)=>{
    try{
        const homes=await prisma.listings.findMany({orderBy:{createdAt:'desc'}})
        return NextResponse.json(homes,{status:200})
    }catch(err){
        console.log(err)
    }
}