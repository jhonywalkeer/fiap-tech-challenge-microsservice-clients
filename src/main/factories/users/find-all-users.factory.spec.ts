import { FindAllUsersUC } from '@application/usecases/users'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllUsersPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindAllUsersControllerFactory } from '@main/factories/users'
import { FindAllUsersController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/user')
jest.mock('@application/usecases/users')
jest.mock('@infrastructure/gateways/queues')
jest.mock('@main/adapters/queues/producers')
jest.mock('@presentation/controllers/users')
jest.mock('@presentation/helpers')

describe('[Factories] Find All Users Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      userRepository: FindAllUsersPrismaRepository
      findAllUsersUseCase: FindAllUsersUC
      findAllUsersController: FindAllUsersController
    } = FindAllUsersControllerFactory()

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.userRepository).toBeInstanceOf(
      FindAllUsersPrismaRepository
    )
    expect(factoryResult.findAllUsersUseCase).toBeInstanceOf(FindAllUsersUC)
    expect(factoryResult.findAllUsersController).toBeInstanceOf(
      FindAllUsersController
    )
  })

  it('should call the constructor of each dependency with the correct parameters', () => {
    FindAllUsersControllerFactory()

    expect(DatabaseConnection).toHaveBeenCalledTimes(1)
    expect(SendMessageAdapter).toHaveBeenCalledTimes(1)
    expect(SendEventGateway).toHaveBeenCalledWith(
      expect.any(SendMessageAdapter)
    )
    expect(FindAllUsersPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(FindAllUsersUC).toHaveBeenCalledWith(
      expect.any(FindAllUsersPrismaRepository),
      expect.any(SendEventGateway)
    )
    expect(HttpGenericResponse).toHaveBeenCalledTimes(1)
    expect(FindAllUsersController).toHaveBeenCalledWith(
      expect.any(FindAllUsersUC),
      expect.any(HttpGenericResponse)
    )
  })
})
