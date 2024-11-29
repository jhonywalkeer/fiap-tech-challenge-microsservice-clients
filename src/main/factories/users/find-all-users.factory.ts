import { FindAllUsersUC } from '@application/usecases/users'
import { PaginateResponse } from '@common/types'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllUsersPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { FindAllUsersController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

export const FindAllUsersControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const userRepository = new FindAllUsersPrismaRepository(databaseConnection)
  const findAllUsersUseCase = new FindAllUsersUC(userRepository)
  const genericSucessPresenter = new HttpGenericResponse<
    PaginateResponse<User>
  >()
  const findAllUsersController = new FindAllUsersController(
    findAllUsersUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    userRepository,
    findAllUsersUseCase,
    findAllUsersController
  }
}
