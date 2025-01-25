import { hash } from "bcrypt";
import { prisma } from "../src/database/prisma";

async function seed(){
    await prisma.user.createMany({
        data: [
            {
                name: 'Gabriel',
                email: 'gabriel@email.com',
                password: await hash('gabriel123', 10),
            },
            {
                name: 'José',
                email: 'jose@email.com',
                password: await hash('jose123', 10),
            },
            {
                name: 'Almeida',
                email: 'almeida@email.com',
                password: await hash('almeida123', 10),
            },
            {
                name: 'Silveira',
                email: 'silveira@email.com',
                password: await hash('silveira123', 10),
            },
        ]
    })
}

seed().then(() => {
    console.log('Database seeded')
    prisma.$disconnect()
})