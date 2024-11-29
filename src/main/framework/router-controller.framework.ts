import { ApiVersion } from '@common/constants'
import { Logger } from '@common/utils/loggers'
import { SwaggerDocumention } from '@main/framework'
import { HealthCheckRoute, UsersRoute } from '@main/routes'
import { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

export const RouterFramework = (app: Application): void => {
  const routes = [
    {
      path: `${ApiVersion}/health`,
      handler: HealthCheckRoute
    },
    { path: `${ApiVersion}/users`, handler: UsersRoute }
  ]

  routes.forEach((route) => {
    app.use(route.path, route.handler)
    app.use(`${ApiVersion}/docs`, serve, setup(SwaggerDocumention))
    Logger.info(`Rota ${route.path} registrada com sucesso!`)
  })
}
