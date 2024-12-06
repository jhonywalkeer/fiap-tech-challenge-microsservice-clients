import { Pagination } from '@common/constants'
import { StatusCode, ErrorName, Operation } from '@common/enums'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllUsersPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { RepositoryMock } from '@mocks/repository.mock'
import { FindAllPaginetedUsersMock } from '@mocks/users'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Find All Users Prisma Repository', () => {
  let repository: FindAllUsersPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      user: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new FindAllUsersPrismaRepository(prisma)
  })

  const queryParameters: PaginationAndFilter = {
    page: Pagination.Default.Page,
    limit: Pagination.Default.Limit
  }

  it('should return a list of users with the pagination and filter', async () => {
    jest
      .spyOn(prisma.user, 'findMany')
      .mockResolvedValue(FindAllPaginetedUsersMock.data as any)
    jest
      .spyOn(prisma.user, 'count')
      .mockResolvedValue(FindAllPaginetedUsersMock.total)

    const result: PaginateResponse<UserEntity> | null =
      await repository.findAll(queryParameters)

    expect(result).toEqual(FindAllPaginetedUsersMock)
  })

  it('should throw an HttpException when list of users fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Find,
      Field.User
    )

    jest.spyOn(prisma.user, 'findMany').mockRejectedValue(httpException)

    try {
      await repository.findAll(queryParameters)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })

  it('should return null when list of users is not found', async () => {
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue([])

    const result = await repository.findAll(queryParameters)

    expect(result).toBeNull()
  })
})
