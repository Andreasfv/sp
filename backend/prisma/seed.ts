import { PrismaClient, Role } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function getUserData() {
  return [
    {
      firstName: 'Ivar',
      lastName: 'Hammerset',
      email: 'ivar@ursolutions.no',
      password: await hash('Tarlad123', 10),
      role: Role.ADMIN,
      Organization: {
        connectOrCreate: {
          where: {
            name: 'Ur Solutions AS',
          },
          create: {
            name: 'Ur Solutions AS',
            description: 'We are a software development company',
          },
        },
      },
    },
    {
      firstName: 'Tormod',
      lastName: 'Haugland',
      email: 'tormod@ursolutions.no',
      password: await hash('Tarlad123', 10),
      Organization: {
        connectOrCreate: {
          where: {
            name: 'Ur Solutions AS',
          },
          create: {
            name: 'Ur Solutions AS',
            description: 'We are a software development company',
          },
        },
      },
    },
    {
      firstName: 'Erlend',
      lastName: 'Therkelsen',
      email: 'erlend@ursolutions.no',
      password: await hash('Tarlad123', 10),
      Organization: {
        connectOrCreate: {
          where: {
            name: 'Ur Solutions AS',
          },
          create: {
            name: 'Ur Solutions AS',
            description: 'We are a software development company',
          },
        },
      },
    },
  ]
}

async function main() {
  const data = await getUserData()
  console.log(`Start seeding ...`)
  for (const u of data) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
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
