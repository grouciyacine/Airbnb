import { NextRequest, NextResponse } from 'next/server'
import prismadb from '@/app/libs/Prismadb'
import { without } from 'lodash'

export const PATCH = async (req: NextRequest, res: NextResponse) => {
    if (req.method === 'PATCH') {
        try {
            const searchParams = req.nextUrl.searchParams
            const id = searchParams.get('id')
            const userID = searchParams.get('userID')
            if (!id || !userID) {
                return NextResponse.json({ msg: `error id not specified ` })
            }
            const user = await prismadb.user.findUnique({ where: { id: userID } })
            const favoritIds = without(user?.favoritIds, id)
            const updateUser = await prismadb.user.update({ where: { id: userID }, data: { favoritIds: favoritIds } })
            return NextResponse.json({ msg: 'Dislike home with success' })
        } catch (err) {
            console.log(err)
            return NextResponse.json(err)
        }
    }
}