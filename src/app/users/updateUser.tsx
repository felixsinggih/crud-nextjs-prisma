'use client'
import type { User } from '@prisma/client'
import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const UpdateUser = ({ user }: { user: User }) => {
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.name)
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.patch(`/api/users/${user.id}`, {
            email: email,
            name: name,
            password: password
        })

        router.refresh()
    }

    const showModal = () => {
        const { Modal } = require("bootstrap")
        const myModal = new Modal(`#updateModal${user.id}`)
        myModal.show()
    }

    return (
        <>
            <div className="d-inline me-3">
                <button type="button" className="btn btn-sm btn-success" onClick={showModal}>
                    Update
                </button>

                <div className={`modal fade`} id={`updateModal${user.id}`} tabIndex={-1} aria-labelledby={`updateModalLabel${user.id}`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`updateModalLabel${user.id}`}>
                                    Update User
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdate}>
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
                                        <label className="form-label">Password <i>(Optional)</i></label>
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

export default UpdateUser