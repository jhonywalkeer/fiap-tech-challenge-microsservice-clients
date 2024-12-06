import { ErrorName, Operation, StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindUserByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { RepositoryMock } from '@mocks/repository.mock'
import { FindUserByIdInputMock, FindUserByIdMock } from '@mocks/users'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Find Users By Id Prisma Repository', () => {
  let repository: FindUserByIdPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      user: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new FindUserByIdPrismaRepository(prisma)
  })

  const pathParameter: FindUserBySocialSecurityNumber = {
    social_security_number: FindUserByIdInputMock
  }

  it('should return a list of user with the social security number path parameter', async () => {
    jest
      .spyOn(prisma.user, 'findUnique')
      .mockResolvedValue(FindUserByIdMock as any)

    const result: UserEntity | null = await repository.findById(pathParameter)

    expect(result).toEqual(FindUserByIdMock)
  })

  it('should throw an HttpException when list of users with the social security number fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Find,
      Field.User
    )

    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(httpException)

    try {
      await repository.findById(pathParameter)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })

  it('should return null when user is not found', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

    const result: UserEntity | null = await repository.findById(pathParameter)

    expect(result).toBeNull()
  })
})
