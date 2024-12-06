import { ExpressRouteAdapter } from '@main/adapters/framework'
import {
  CreateUserControllerFactory,
  FindUserByIdControllerFactory,
  FindAllUsersControllerFactory
} from '@main/factories/users'
import { UsersRoute } from '@main/routes/users.route'
import { Router } from 'express'

describe('[Routes] Users Route', () => {
  it('should be defined', () => {
    expect(UsersRoute).toBeDefined()
  })

  it('should be able to call the route', () => {
    const route = Router()
    const { createUserController } = CreateUserControllerFactory()
    const { findUserByIdController } = FindUserByIdControllerFactory()
    const { findAllUsersController } = FindAllUsersControllerFactory()

    UsersRoute.post('/', ExpressRouteAdapter(createUserController))
      .get('/:cpf', ExpressRouteAdapter(findUserByIdController))
      .get('/', ExpressRouteAdapter(findAllUsersController))

    expect(route).toBeDefined()
  })
})
