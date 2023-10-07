import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import type { Post } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const body: Post = await request.json()

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: body.authorId
        }
    })
    return NextResponse.json(post, { status: 201 })
}