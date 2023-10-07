import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const load = async () => {
//     try {
//         await prisma.user.deleteMany();
//         console.log('Deleted records in user table');

//         await prisma.post.deleteMany();
//         console.log('Deleted records in post table');

//         await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
//         console.log('reset user auto increment to 1');

//         await prisma.$queryRaw`ALTER TABLE post AUTO_INCREMENT = 1`;
//         console.log('reset post auto increment to 1');

//         await prisma.user.create({
//             data: {
//                 email: 'admin@example.com',
//                 name: 'Admin',
//                 password: 'password'
//             }
//         });
//         console.log('Added user admin');
//     } catch (e) {
//         console.error(e);
//         process.exit(1);
//     } finally {
//         await prisma.$disconnect();
//     }
// };

// load();

async function main() {
    const admin = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            name: 'Admin',
            password: 'password'
        }
    })
    console.log({ admin })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })