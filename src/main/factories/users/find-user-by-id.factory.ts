import { FindUserByIdUC } from '@application/usecases/users'
import { UserEntity } from '@domain/entities'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindUserByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindByIdController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

export const FindUserByIdControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const sendMessageAdapter = new SendMessageAdapter()
  const sendEvent = new SendEventGateway(sendMessageAdapter)
  const userRepository = new FindUserByIdPrismaRepository(databaseConnection)
  const findUserByIdUserUseCase = new FindUserByIdUC(userRepository, sendEvent)
  const genericSucessPresenter = new HttpGenericResponse<UserEntity>()
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
