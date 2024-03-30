import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/app/libs/Prismadb'


export const POST = async (req: NextRequest, res: NextResponse) => {
    if (req.method === 'POST') {
        try {
            const searchParams = req.nextUrl.searchParams
            const id = searchParams.get('id') as string
            const userID = searchParams.get('userID') as string
            if (!id || !userID) {
                return NextResponse.json({ msg: `error id not specified ` })
            }
            const user = await prismadb.user.findUnique({ where: { id: userID } })
            const favoritIds = user?.favoritIds
            if (!favoritIds?.includes(id)) {
                await prismadb.user.update({ where: { id: userID }, data: { favoritIds: { push: id } } })
                return NextResponse.json({ msg: 'Like Home with success' })
            } else {
                return NextResponse.json({ msg: 'ID already exists in favoritIds' })
            }
        } catch (err) {
            console.log(err)
            return NextResponse.json(err)
        }
    }
}
