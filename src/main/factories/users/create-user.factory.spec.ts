import { CreateUserUC } from '@application/usecases/users'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateUserPrismaRepository,
  FindUserByIdPrismaRepository,
  FindUserByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/user'
import { CreateUserControllerFactory } from '@main/factories/users'
import { CreateUserController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/user')
jest.mock('@application/usecases/users')
jest.mock('@presentation/controllers/users')
jest.mock('@presentation/helpers')

describe('[Factories] Create User Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      findUserByConditionRepository: FindUserByConditionPrismaRepository
      findUserByIdRepository: FindUserByIdPrismaRepository
      createUserRepository: CreateUserPrismaRepository
      createUserUseCase: CreateUserUC
      createUserController: CreateUserController
    } = CreateUserControllerFactory()

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.findUserByIdRepository).toBeInstanceOf(
      FindUserByIdPrismaRepository
    )
    expect(factoryResult.findUserByConditionRepository).toBeInstanceOf(
      FindUserByConditionPrismaRepository
    )
    expect(factoryResult.createUserRepository).toBeInstanceOf(
      CreateUserPrismaRepository
    )
    expect(factoryResult.createUserUseCase).toBeInstanceOf(CreateUserUC)
    expect(factoryResult.createUserController).toBeInstanceOf(
      CreateUserController
    )
  })

  it('should call the constructor of each dependency with the correct parameters', () => {
    CreateUserControllerFactory()

    expect(DatabaseConnection).toHaveBeenCalledTimes(1)
    expect(FindUserByIdPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(FindUserByConditionPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(CreateUserPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(CreateUserUC).toHaveBeenCalledWith(
      expect.any(FindUserByIdPrismaRepository),
      expect.any(FindUserByConditionPrismaRepository),
      expect.any(CreateUserPrismaRepository)
    )
    expect(HttpGenericResponse).toHaveBeenCalledTimes(1)
    expect(CreateUserController).toHaveBeenCalledWith(
      expect.any(CreateUserUC),
      expect.any(HttpGenericResponse)
    )
  })
})
