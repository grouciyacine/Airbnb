import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/app/libs/Prismadb'
import { NextRequest, NextResponse } from 'next/server'
export const GET = async (req: NextRequest, res: NextApiResponse) => {
    try {
        const searchParams = req.nextUrl.searchParams ;
        const category = searchParams.get('category');
        if (!category) {
            console.error('Category parameter is missing in the request.');
            return NextResponse.json({ error: 'Category parameter is missing in the request.' }, { status: 200 })
        }
        const homes = await prisma.listings.findMany({ where: { type: category } })
        if (homes.length === 0) {
            console.log('No listings found for the specified category.');
            return NextResponse.json({ error: 'No listings found for the specified category.' }, { status: 404 })

        } else {
            
            return NextResponse.json(homes, { status: 200 })
        }

        //return NextResponse.json(homes,{status:200})
    } catch (err) {
        console.error('Error processing request:', err);
        return NextResponse.json(err)
    }
}
