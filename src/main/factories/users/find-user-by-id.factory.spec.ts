import { FindUserByIdUC } from '@application/usecases/users'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindUserByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindUserByIdControllerFactory } from '@main/factories/users/find-user-by-id.factory'
import { FindByIdController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/user')
jest.mock('@application/usecases/users')
jest.mock('@infrastructure/gateways/queues')
jest.mock('@main/adapters/queues/producers')
jest.mock('@presentation/controllers/users')
jest.mock('@presentation/helpers')

describe('[Factories] Find User By Id Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      userRepository: FindUserByIdPrismaRepository
      findUserByIdUserUseCase: FindUserByIdUC
      findUserByIdController: FindByIdController
    } = FindUserByIdControllerFactory()

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.userRepository).toBeInstanceOf(
      FindUserByIdPrismaRepository
    )
    expect(factoryResult.findUserByIdUserUseCase).toBeInstanceOf(FindUserByIdUC)
    expect(factoryResult.findUserByIdController).toBeInstanceOf(
      FindByIdController
    )
  })

  it('should call the constructor of each dependency with the correct parameters', () => {
    FindUserByIdControllerFactory()

    expect(DatabaseConnection).toHaveBeenCalledTimes(1)
    expect(SendMessageAdapter).toHaveBeenCalledTimes(1)
    expect(SendEventGateway).toHaveBeenCalledWith(
      expect.any(SendMessageAdapter)
    )
    expect(FindUserByIdPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(FindUserByIdUC).toHaveBeenCalledWith(
      expect.any(FindUserByIdPrismaRepository),
      expect.any(SendEventGateway)
    )
    expect(HttpGenericResponse).toHaveBeenCalledTimes(1)
    expect(FindByIdController).toHaveBeenCalledWith(
      expect.any(FindUserByIdUC),
      expect.any(HttpGenericResponse)
    )
  })
})
