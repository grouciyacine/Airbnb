import { NextRequest, NextResponse } from 'next/server'
import prismaDb from '@/app/libs/Prismadb'
import handler from '../hand/route'

export const POST = async (req: NextRequest, res: NextResponse) => {
    try{
    const body = await req.json()
    if (body) {
        const { endDate, startDate, totalPrice,listingId } = body
        const user=await handler(req,res) as string | any
        await prismaDb.reservations.create({ data: { endDate: endDate, startDate: startDate, totalPrice: totalPrice,userId:user?.others?.id, listingId } })
        return NextResponse.json('success Reservations',{status:200})
    }
    }catch(err){
        console.log(err)
    }
}