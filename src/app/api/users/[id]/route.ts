import type { User } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: String } }) => {
    const body: User = await request.json()
    const hashedPassword = await bcrypt.hash(body.password, 10)
    let dataUpdate: {}

    if (body.password) {
        dataUpdate = {
            email: body.email,
            name: body.name,
            password: hashedPassword
        }
    } else {
        dataUpdate = {
            email: body.email,
            name: body.name
        }
    }

    const user = await prisma.user.update({
        where: {
            id: Number(params.id)
        },
        data: dataUpdate
    })
    return NextResponse.json(user, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: String } }) => {
    const user = await prisma.user.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(user, { status: 200 })
}