import { ExpressRouteAdapter } from '@main/adapters'
import {
  CreateUserControllerFactory,
  FindUserByIdControllerFactory,
  FindAllUsersControllerFactory
} from '@main/factories/users'
import { Router } from 'express'

export const UsersRoute = Router()

const { createUserController } = CreateUserControllerFactory()
const { findUserByIdController } = FindUserByIdControllerFactory()
const { findAllUsersController } = FindAllUsersControllerFactory()

UsersRoute.post('/', ExpressRouteAdapter(createUserController))
  .get('/:cpf', ExpressRouteAdapter(findUserByIdController))
  .get('/', ExpressRouteAdapter(findAllUsersController))
