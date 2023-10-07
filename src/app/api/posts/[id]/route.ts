import type { Post } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: String } }) => {
    const body: Post = await request.json()

    const post = await prisma.post.update({
        where: {
            id: Number(params.id)
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: body.authorId
        }
    })
    return NextResponse.json(post, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: String } }) => {
    const post = await prisma.post.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(post, { status: 200 })
}