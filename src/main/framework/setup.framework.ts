import { ApiVersion } from '@common/constants'
import { VersionApiIdentify } from '@common/utils/identifiers'
import { Logger } from '@common/utils/loggers'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { RouterFramework } from '@main/framework'
import { RateLimiter } from '@presentation/middlewares/rate-limiter.middleware'
import cors from 'cors'
import express, { Express } from 'express'

export const SetupFramework = async (): Promise<void> => {
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000
  const host: string = '0.0.0.0'
  const baseUrl: string = `${process.env.HOST}:${port}`
  const framework: Express = express()
  const db: DatabaseConnection = new DatabaseConnection()
  const isDbConnected: boolean = await db.isConnected()
  const rateLimiter = new RateLimiter({ windowMs: 60 * 1000, maxRequests: 500 }) // 500 requests per minute

  if (!isDbConnected) {
    Logger.error(
      'Não foi possível conectar com o banco de dados! Aplicação esta sendo finalizada'
    )
    process.exit(1)
  }

  framework.use(cors())
  framework.use(rateLimiter.handle.bind(rateLimiter))
  framework.use(express.json())

  RouterFramework(framework)

  framework.listen(port, host, () => {
    Logger.info('Banco de dados conectado com sucesso!')
    Logger.info(`Servidor rodando em ${baseUrl}`)
    Logger.info(`API executando na versao ${VersionApiIdentify()}`)
    Logger.info(
      `Documentacao da API disponivel em: ${baseUrl}${ApiVersion}/docs`
    )
  })
}
