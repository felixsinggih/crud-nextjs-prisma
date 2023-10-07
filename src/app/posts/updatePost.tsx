'use client'
import type { User } from '@prisma/client'
import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Post = {
    title: string;
    id: number;
    content: string;
    author: {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

const UpdatePost = ({ post, users }: { post: Post, users: User[] }) => {
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const [author, setAuthor] = useState(post.author.id)

    const router = useRouter()

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.patch(`/api/posts/${post.id}`, {
            title: title,
            content: content,
            authorId: Number(author)
        })

        router.refresh()
    }

    const showModal = () => {
        const { Modal } = require("bootstrap")
        const myModal = new Modal(`#updateModal${post.id}`)
        myModal.show()
    }

    return (
        <>
            <div className="d-inline me-3">
                <button type="button" className="btn btn-sm btn-success" onClick={showModal}>
                    Update
                </button>

                <div className={`modal fade`} id={`updateModal${post.id}`} tabIndex={-1} aria-labelledby={`updateModalLabel${post.id}`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`updateModalLabel${post.id}`}>
                                    Update Post
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            type="input"
                                            className="form-control"
                                            placeholder="Title" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Content</label>
                                        <input
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            type="input"
                                            className="form-control"
                                            placeholder="content" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Author</label>
                                        <select
                                            value={author}
                                            onChange={(e) => setAuthor(Number(e.target.value))}
                                            className="form-select" >
                                            {users.map((user) => (
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePost