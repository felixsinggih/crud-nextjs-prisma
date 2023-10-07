'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Post = {
    title: string;
    id: number;
    content: string;
    author: {
        id: number;
        email: string;
        name: string;
    };
}

const DeletePost = ({ post }: { post: Post }) => {
    const router = useRouter()

    const handleDelete = async (postId: Number) => {
        await axios.delete(`/api/posts/${postId}`)
        router.refresh()
    }

    const showModal = () => {
        const { Modal } = require("bootstrap");
        const myModal = new Modal(`#deleteModal${post.id}`);
        myModal.show();
    };



    return (
        <>
            <div className="d-inline">
                <button type="button" className="btn btn-sm btn-danger" onClick={showModal}>
                    Delete
                </button>

                <div className="modal fade" id={`deleteModal${post.id}`} tabIndex={-1} aria-labelledby={`deleteModalLabel${post.id}`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`deleteModalLabel${post.id}`}>
                                    Are you sure want to delete {post.title}?
                                </h5>
                            </div>
                            <div className="modal-body text-center">
                                <button type="button" className="btn btn-danger mx-3" data-bs-dismiss="modal" aria-label="Close">No</button>
                                <button onClick={() => handleDelete(post.id)} type="button" className="btn btn-primary mx-3" data-bs-dismiss="modal" aria-label="Close">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePost