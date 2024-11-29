import { FindUserByIdUC } from '@application/usecases/users'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindUserByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { FindByIdController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

export const FindUserByIdControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const userRepository = new FindUserByIdPrismaRepository(databaseConnection)
  const findUserByIdUserUseCase = new FindUserByIdUC(userRepository)
  const genericSucessPresenter = new HttpGenericResponse<User>()
  const findUserByIdController = new FindByIdController(
    findUserByIdUserUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    userRepository,
    findUserByIdUserUseCase,
    findUserByIdController
  }
}
