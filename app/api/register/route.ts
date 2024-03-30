import prisma from '@/app/libs/Prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';
export const POST = async (req:Request) => {
        try {
            const body=await req.json();
            const { email, name, password } = body
            const user = await prisma.user.findUnique({ where: { email: email } })
            if (user) {
                return NextResponse.json('error email already exists')
            }
            const salt = bcrypt.genSaltSync(12)
            const hashPassword = bcrypt.hashSync(password, salt)
            const saveUser = await prisma.user.create({
                data: { password: hashPassword, 
                    email: email, 
                    name: name,image:'' }
            })
            return NextResponse.json(saveUser);
        } catch (err) {
            console.log(err)
            return NextResponse.json('error')
        }
    } 