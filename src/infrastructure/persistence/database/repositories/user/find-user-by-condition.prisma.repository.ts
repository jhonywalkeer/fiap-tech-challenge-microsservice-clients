import { FindUserByConditionRepository } from '@application/repositories/user'
import { StatusCode, ErrorName, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserByCondition } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindUserByConditionPrismaRepository
  implements FindUserByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameter: FindUserByCondition
  ): Promise<UserEntity[] | null> {
    try {
      const findUser = await this.prisma.user.findMany({
        where: {
          email: pathParameter.email
        }
      })

      return !findUser || findUser.length === 0 ? null : findUser
    } catch (error) {
      Logger.error(
        `[FindUserByConditionPrismaRepository.findByCondition]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.User)
      )
    }
  }
}
