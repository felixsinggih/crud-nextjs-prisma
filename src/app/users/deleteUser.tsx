'use client'
import type { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteUser = ({ user }: { user: User }) => {
    const router = useRouter()

    const handleDelete = async (userId: Number) => {
        await axios.delete(`/api/users/${user.id}`)

        router.refresh()
    }

    const showModal = () => {
        const { Modal } = require("bootstrap")
        const myModal = new Modal(`#deleteModal${user.id}`)
        myModal.show()
    }

    return (
        <>
            <div className="d-inline">
                <button type="button" className="btn btn-sm btn-danger" onClick={showModal}>
                    Delete
                </button>

                <div className={`modal fade`} id={`deleteModal${user.id}`} tabIndex={-1} aria-labelledby={`deleteModalLabel${user.id}`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`deleteModalLabel${user.id}`}>
                                    Are you sure want to delete {user.name}?
                                </h5>
                            </div>
                            <div className="modal-body text-center">
                                <button type="button" className="btn btn-danger mx-3" data-bs-dismiss="modal" aria-label="Close">No</button>
                                <button onClick={() => handleDelete(user.id)} type="button" className="btn btn-primary mx-3" data-bs-dismiss="modal" aria-label="Close">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteUser