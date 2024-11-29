import {
  CreateUserRepository,
  FindUserByConditionRepository,
  FindUserByIdRepository
} from '@application/repositories/user'
import { CreateUserUC } from '@application/usecases/users'
import { StatusCode, ErrorName } from '@common/enums'
import { ExistsError } from '@common/errors'
import { User } from '@domain/entities'
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
  let findUserByIdRepository: FindUserByIdRepository
  let findUserByConditionRepository: FindUserByConditionRepository
  let createUserRepository: CreateUserRepository

  const input: CreateUser = InputUserBodyMock
  const findedUserById: User = FindUserByIdMock

  beforeEach(() => {
    findUserByIdRepository = {
      findById: jest.fn()
    }
    findUserByConditionRepository = {
      findByCondition: jest.fn()
    }
    createUserRepository = {
      create: jest.fn()
    }
    createUserUC = new CreateUserUC(
      findUserByIdRepository,
      findUserByConditionRepository,
      createUserRepository
    )
  })

  it('should return the created user', async () => {
    jest.spyOn(findUserByIdRepository, 'findById').mockResolvedValue(null)
    jest
      .spyOn(findUserByConditionRepository, 'findByCondition')
      .mockResolvedValue(null)
    jest
      .spyOn(createUserRepository, 'create')
      .mockResolvedValue(CreatedUserMock)

    const result: User = await createUserUC.execute(input)

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
    expect(result).toEqual(CreatedUserMock)
  })

  it('should generate an error if the user already exists when searching by social security number (CPF)', async () => {
    jest
      .spyOn(findUserByIdRepository, 'findById')
      .mockResolvedValue(findedUserById)

    expect(() => createUserUC.execute(InputUserBodyMock)).rejects.toThrow(
      ExistsResourceStub
    )
    expect(ExistsResourceStub.statusCode).toBe(StatusCode.Conflict)
    expect(ExistsResourceStub.name).toBe(ErrorName.ResourceAlreadyExists)
    expect(ExistsResourceStub.message).toBe(ExistsError(Field.User))
  })

  it('should generate an error if the user already exists when searching by mail', async () => {
    jest
      .spyOn(findUserByConditionRepository, 'findByCondition')
      .mockResolvedValue([findedUserById] as User[])

    expect(() => createUserUC.execute(input)).rejects.toThrow(
      ExistsResourceStub
    )
    expect(ExistsResourceStub.statusCode).toBe(StatusCode.Conflict)
    expect(ExistsResourceStub.name).toBe(ErrorName.ResourceAlreadyExists)
    expect(ExistsResourceStub.message).toBe(ExistsError(Field.User))
  })
})
