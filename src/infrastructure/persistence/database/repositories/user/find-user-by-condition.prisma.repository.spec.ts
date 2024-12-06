import { StatusCode, ErrorName, Operation } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserByCondition } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindUserByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { RepositoryMock } from '@mocks/repository.mock'
import { FindUserByConditionMock, InputUserMailMock } from '@mocks/users'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Find Users By Condition Prisma Repository', () => {
  let repository: FindUserByConditionPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      user: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new FindUserByConditionPrismaRepository(prisma)
  })

  const pathParameter: FindUserByCondition = {
    email: InputUserMailMock
  }

  it('should return a list of users with the email path parameter', async () => {
    jest
      .spyOn(prisma.user, 'findMany')
      .mockResolvedValue([FindUserByConditionMock] as any)

    const result: UserEntity[] | null =
      await repository.findByCondition(pathParameter)

    expect(result).toEqual([FindUserByConditionMock])
  })

  it('should throw an HttpException when list of users with the email fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Find,
      Field.User
    )

    jest.spyOn(prisma.user, 'findMany').mockRejectedValue(httpException)

    try {
      await repository.findByCondition(pathParameter)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })

  it('should return null when user is not found', async () => {
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue([])

    const result: UserEntity[] | null =
      await repository.findByCondition(pathParameter)

    expect(result).toBeNull()
  })
})
