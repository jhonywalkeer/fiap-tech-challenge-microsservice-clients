import { FindAllUsersUC } from '@application/usecases/users'
import { PaginateResponse } from '@common/types'
import { UserEntity } from '@domain/entities'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllUsersPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindAllUsersController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

export const FindAllUsersControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const sendMessageAdapter = new SendMessageAdapter()
  const sendEvent = new SendEventGateway(sendMessageAdapter)
  const userRepository = new FindAllUsersPrismaRepository(databaseConnection)
  const findAllUsersUseCase = new FindAllUsersUC(userRepository, sendEvent)
  const genericSucessPresenter = new HttpGenericResponse<
    PaginateResponse<UserEntity>
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
