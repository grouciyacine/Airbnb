import prismadb from "@/app/libs/Prismadb"
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get('id') as string
        if (id) {
            const home = await prismadb.listings.findUnique({ where: { id: id } })
            return NextResponse.json(home, { status: 200 });
        } else {
            return NextResponse.json({ msg: "Error no id exist " }, { status: 500 })
        }
    } catch (err) {
        console.log(err)
    }
}