import { CreateUserUC } from '@application/usecases/users'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateUserPrismaRepository,
  FindUserByIdPrismaRepository,
  FindUserByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/user'
import { CreateUserController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

export const CreateUserControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findUserByIdRepository = new FindUserByIdPrismaRepository(
    databaseConnection
  )
  const findUserByConditionRepository = new FindUserByConditionPrismaRepository(
    databaseConnection
  )
  const createUserRepository = new CreateUserPrismaRepository(
    databaseConnection
  )
  const createUserUseCase = new CreateUserUC(
    findUserByIdRepository,
    findUserByConditionRepository,
    createUserRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<User>()
  const createUserController = new CreateUserController(
    createUserUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    findUserByConditionRepository,
    findUserByIdRepository,
    createUserRepository,
    createUserUseCase,
    createUserController
  }
}
