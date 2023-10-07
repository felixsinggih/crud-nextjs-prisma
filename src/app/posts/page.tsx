import { PrismaClient } from "@prisma/client"
import AddPost from "./addPost"
import DeletePost from "./deletePost"
import UpdatePost from "./updatePost"

const prisma = new PrismaClient()

const getPosts = async () => {
    const res = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: true,
        }
    })
    return res
}

const getUsers = async () => {
    const res = await prisma.user.findMany()
    return res
}

const PostsPage = async () => {
    const [posts, users] = await Promise.all([getPosts(), getUsers()])

    return (
        <>
            <div className="mb-3">
                <AddPost users={users} />
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.author.name}</td>
                                <td>
                                    <UpdatePost post={post} users={users} />
                                    <DeletePost post={post} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PostsPage

export const revalidate = 0