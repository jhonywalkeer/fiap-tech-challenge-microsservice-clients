import {
  CreateUserRepository,
  FindUserByConditionRepository,
  FindUserByIdRepository
} from '@application/repositories/user'
import { CreateUserUC } from '@application/usecases/users'
import { StatusCode, ErrorName } from '@common/enums'
import { ExistsError } from '@common/errors'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateUser } from '@domain/interfaces/user'
import { CreateUserUseCase } from '@domain/usecases/user'
import {
  CreatedUserMock,
  FindUserByIdMock,
  InputUserBodyMock
} from '@mocks/users'
import { ExistsResourceStub } from '@stubs/exceptions'

describe('[Use Cases] Create User Use Case', () => {
  let createUserUC: CreateUserUseCase
  let findUserByIdRepository: jest.Mocked<FindUserByIdRepository>
  let findUserByConditionRepository: jest.Mocked<FindUserByConditionRepository>
  let createUserRepository: jest.Mocked<CreateUserRepository>
  let logger: jest.SpyInstance

  const input: CreateUser = InputUserBodyMock
  const findedUserById: UserEntity = FindUserByIdMock

  beforeEach(() => {
    findUserByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindUserByIdRepository>
    findUserByConditionRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindUserByConditionRepository>
    createUserRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<CreateUserRepository>

    createUserUC = new CreateUserUC(
      findUserByIdRepository,
      findUserByConditionRepository,
      createUserRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the created user', async () => {
    findUserByIdRepository.findById.mockResolvedValue(null)
    findUserByConditionRepository.findByCondition.mockResolvedValue(null)
    createUserRepository.create.mockResolvedValue(CreatedUserMock)

    const result: UserEntity = await createUserUC.execute(input)

    expect(createUserUC.execute).toBeInstanceOf(Function)
    expect(findUserByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(findUserByIdRepository.findById).toHaveBeenCalledWith(input)
    expect(findUserByConditionRepository.findByCondition).toHaveBeenCalledTimes(
      1
    )
    expect(findUserByConditionRepository.findByCondition).toHaveBeenCalledWith(
      input
    )
    expect(createUserRepository.create).toHaveBeenCalledTimes(1)
    expect(createUserRepository.create).toHaveBeenCalledWith(input)
    expect(logger).toHaveBeenCalledWith('[CreateUserUC.execute]')
    expect(result).toEqual(CreatedUserMock)
  })

  it('should generate an error if the user already exists when searching by social security number (CPF)', async () => {
    findUserByIdRepository.findById.mockResolvedValue(findedUserById)

    expect(() => createUserUC.execute(InputUserBodyMock)).rejects.toThrow(
      ExistsResourceStub
    )
    expect(ExistsResourceStub.statusCode).toBe(StatusCode.Conflict)
    expect(ExistsResourceStub.name).toBe(ErrorName.ResourceAlreadyExists)
    expect(ExistsResourceStub.message).toBe(ExistsError(Field.User))
  })

  it('should generate an error if the user already exists when searching by mail', async () => {
    findUserByConditionRepository.findByCondition.mockResolvedValue([
      findedUserById
    ] as UserEntity[])

    expect(() => createUserUC.execute(input)).rejects.toThrow(
      ExistsResourceStub
    )
    expect(ExistsResourceStub.statusCode).toBe(StatusCode.Conflict)
    expect(ExistsResourceStub.name).toBe(ErrorName.ResourceAlreadyExists)
    expect(ExistsResourceStub.message).toBe(ExistsError(Field.User))
  })
})
