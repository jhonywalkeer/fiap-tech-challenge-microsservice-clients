import { CreateUserRepository } from '@application/repositories/user'
import { StatusCode, ErrorName, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateUser } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateUserPrismaRepository implements CreateUserRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreateUser): Promise<UserEntity> {
    try {
      return await this.prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          social_security_number: payload.social_security_number
        }
      })
    } catch (error) {
      Logger.error(
        `[CreateUserPrismaRepository.create]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Create, Field.User)
      )
    }
  }
}
