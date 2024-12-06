import { UserSeeds } from '@infrastructure/persistence/database/seeds'
import { PrismaClient } from '@prisma/client'

describe('[Persistence] User Seeds', () => {
  let prisma: PrismaClient

  beforeEach(() => {
    prisma = new PrismaClient()
  })

  afterEach(async () => {
    await prisma.$disconnect()
  })

  it('should seed users correctly', async () => {
    const createManySpy = jest
      .spyOn(prisma.user, 'createMany')
      .mockResolvedValue({ count: 3 })
    const seedFunction = UserSeeds(prisma)
    await seedFunction()
    expect(createManySpy).toHaveBeenCalledWith({
      data: [
        {
          email: 'paty@fiap.com.br',
          social_security_number: '761.638.630-03',
          name: 'Patrícia Emily'
        },
        {
          email: 'hadassa@fiap.com.br',
          social_security_number: '602.597.527-20',
          name: 'Hadassa Mariana'
        },
        {
          email: 'ester@fiap.com.br',
          social_security_number: '418.275.478-63',
          name: 'Ester Bianca'
        }
      ]
    })
  })
})
