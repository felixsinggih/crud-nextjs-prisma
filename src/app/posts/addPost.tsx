'use client'
import type { User } from '@prisma/client'
import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const AddPost = ({ users }: { users: User[] }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('/api/posts', {
            title: title,
            content: content,
            authorId: Number(author)
        })

        setTitle("")
        setContent("")
        setAuthor("")
        router.refresh()
    }

    const showModal = () => {
        const { Modal } = require("bootstrap")
        const myModal = new Modal("#addModal")
        myModal.show()
    }

    return (
        <>
            <div className="d-flex">
                <button type="button" className="btn btn-primary" onClick={showModal}>
                    Add New
                </button>

                <div className={`modal fade`} id="addModal" tabIndex={-1} aria-labelledby="addModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addModalLabel">
                                    Add New Post
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
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
                                            placeholder="Content" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Author</label>
                                        <select
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className="form-select" >
                                            <option selected>Select author</option>
                                            {users.map((user) => (
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPost