'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

const AddUser = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('/api/users', {
            email: email,
            name: name,
            password: password
        })

        setEmail("")
        setName("")
        setPassword("")
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
                                        <label className="form-label">Email</label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="input"
                                            className="form-control"
                                            placeholder="Email" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="input"
                                            className="form-control"
                                            placeholder="Name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            className="form-control"
                                            placeholder="Password" />
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

export default AddUser