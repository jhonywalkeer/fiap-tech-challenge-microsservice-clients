import { FindAllUsersRepository } from '@application/repositories/user'
import { FindAllUsersUC } from '@application/usecases/users'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllUsersUseCase } from '@domain/usecases/user'
import { PaginationInputMock } from '@mocks/pagination'
import { FindAllPaginetedUsersMock } from '@mocks/users'
import { NotFoundStub } from '@stubs/exceptions'

describe('[Use Cases] Find All Users Use Case', () => {
  let findAllUsersUC: FindAllUsersUseCase
  let findAllUsersRepository: FindAllUsersRepository

  const input: PaginationAndFilter = PaginationInputMock
  const findedAllUsers: PaginateResponse<User> = FindAllPaginetedUsersMock

  beforeEach(() => {
    findAllUsersRepository = {
      findAll: jest.fn()
    }

    findAllUsersUC = new FindAllUsersUC(findAllUsersRepository)
  })
  it('should return a list of users', async () => {
    jest
      .spyOn(findAllUsersRepository, 'findAll')
      .mockResolvedValue(findedAllUsers)

    const result: PaginateResponse<User> = await findAllUsersUC.execute(input)

    expect(findAllUsersUC.execute).toBeInstanceOf(Function)
    expect(findAllUsersRepository.findAll).toHaveBeenCalledTimes(1)
    expect(findAllUsersRepository.findAll).toHaveBeenCalledWith(input)
    expect(result).toEqual(FindAllPaginetedUsersMock)
  })

  it('should throw an error when the list of users is not found', async () => {
    jest.spyOn(findAllUsersRepository, 'findAll').mockResolvedValue(null)

    expect(() => findAllUsersUC.execute(input)).rejects.toThrow(NotFoundStub)

    expect(NotFoundStub.statusCode).toBe(StatusCode.NotFound)
    expect(NotFoundStub.name).toBe(ErrorName.NotFoundInformation)
    expect(NotFoundStub.message).toBe(
      NotOccurredError(Operation.Find, Field.User)
    )
  })
})
