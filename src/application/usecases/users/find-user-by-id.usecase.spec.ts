import { FindUserByIdRepository } from '@application/repositories/user'
import { FindUserByIdUC } from '@application/usecases/users'
import { StatusCode, ErrorName, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { FindUserByIdUseCase } from '@domain/usecases/user'
import { FindUserByIdMock } from '@mocks/users'
import { NotFoundStub } from '@stubs/exceptions'

describe('[Use Cases] Find User By Id Use Case', () => {
  let findUserByIdRepository: FindUserByIdRepository
  let findUserByIdUC: FindUserByIdUseCase

  const input: FindUserBySocialSecurityNumber = {
    social_security_number: FindUserByIdMock.social_security_number
  }

  beforeEach(() => {
    findUserByIdRepository = {
      findById: jest.fn()
    }
    findUserByIdUC = new FindUserByIdUC(findUserByIdRepository)
  })

  it('should return a user', async () => {
    jest
      .spyOn(findUserByIdRepository, 'findById')
      .mockResolvedValue(FindUserByIdMock)

    const response: User = await findUserByIdUC.execute(input)

    expect(response).toEqual(FindUserByIdMock)
  })

  it('should throw an error when the user is not found', async () => {
    jest.spyOn(findUserByIdRepository, 'findById').mockResolvedValue(null)

    expect(() => findUserByIdUC.execute(input)).rejects.toThrow(NotFoundStub)
    expect(NotFoundStub.statusCode).toBe(StatusCode.NotFound)
    expect(NotFoundStub.name).toBe(ErrorName.NotFoundInformation)
    expect(NotFoundStub.message).toBe(
      NotOccurredError(Operation.Find, Field.User)
    )
  })
})
