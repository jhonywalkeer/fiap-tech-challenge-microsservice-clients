import { StatusCode, ErrorName, Operation } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateUser } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateUserPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { RepositoryMock } from '@mocks/repository.mock'
import { CreatedUserMock, InputUserBodyMock } from '@mocks/users'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Create User Prisma Repository', () => {
  let repository: CreateUserPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      user: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new CreateUserPrismaRepository(prisma)
  })

  const body: CreateUser = {
    name: InputUserBodyMock.name,
    email: InputUserBodyMock.email,
    social_security_number: InputUserBodyMock.social_security_number
  }

  it('should create a user successfully', async () => {
    jest.spyOn(prisma.user, 'create').mockResolvedValue(CreatedUserMock)

    const userEntity: UserEntity = CreatedUserMock
    const result = await repository.create(body)

    expect(result).toEqual(userEntity)
  })

  it('should throw an HttpException when user creation fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Create,
      Field.User
    )

    jest.spyOn(prisma.user, 'create').mockRejectedValue(httpException)

    try {
      await repository.create(body)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })
})
