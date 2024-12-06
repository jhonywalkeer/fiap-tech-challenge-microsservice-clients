import { FindUserByIdRepository } from '@application/repositories/user'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindUserByIdPrismaRepository implements FindUserByIdRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(
    pathParameter: FindUserBySocialSecurityNumber
  ): Promise<UserEntity | null> {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          social_security_number: pathParameter.social_security_number
        }
      })
      return !findUser ? null : findUser
    } catch (error) {
      Logger.error(
        `[FindUserByIdPrismaRepository.findById]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.User)
      )
    }
  }
}
