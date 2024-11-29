import { PrismaClient } from '@prisma/client'

export const UserSeeds = (orm: PrismaClient) => async () => {
  await orm.user.createMany({
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
}
