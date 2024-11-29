import { Logger } from '@common/utils/loggers'
import { UserSeeds } from '@infrastructure/persistence/database/seeds'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await UserSeeds(prisma)()
  Logger.info('[Prisma] Seeds created successfully')
}

main()
  .catch((e) => {
    Logger.error('[Prisma]', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
