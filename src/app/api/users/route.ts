import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import type { User } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const body: User = await request.json()
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            password: hashedPassword
        }
    })
    return NextResponse.json(user, { status: 201 })
}