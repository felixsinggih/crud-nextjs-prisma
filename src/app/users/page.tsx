import { PrismaClient } from "@prisma/client"
import AddUser from "./addUser"
import DeleteUser from "./deleteUser"
import UpdateUser from "./updateUser"

const prisma = new PrismaClient()

const getUsers = async () => {
    const res = await prisma.user.findMany()
    return res
}

const UsersPage = async () => {
    const users = await getUsers()

    return (
        <>
            <div className="mb-3">
                <AddUser />
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <UpdateUser user={user} />
                                    <DeleteUser user={user} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UsersPage

export const revalidate = 0