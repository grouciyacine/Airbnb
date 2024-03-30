import prismaDB from '@/app/libs/Prismadb'
import {NextRequest,NextResponse} from 'next/server'
import handler from '../hand/route'

export const GET=async(req:NextRequest,res:NextResponse)=>{
    try{
        const user=await handler(req, res) as string | any
        const favoriteIDs=await user?.others?.favoritIds?.map((favorites:any)=>favorites)
        const myHouses=await prismaDB.listings.findMany({where:{id:{in:favoriteIDs}}})
        return NextResponse.json(myHouses,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json(err,{status:500})
    }
}

