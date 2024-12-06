import { FindAllUsersRepository } from '@application/repositories/user'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { PaginationFilter } from '@common/utils/filters'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllUsersPrismaRepository implements FindAllUsersRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    payload: PaginationAndFilter
  ): Promise<PaginateResponse<UserEntity> | null> {
    try {
      const sortingField: string = payload.sort || 'created_at'
      const findUsers = await this.prisma.user.findMany({
        ...PaginationFilter(payload.page, payload.limit),
        orderBy: {
          [sortingField]: payload.order
        }
      })
      const countUsers = await this.prisma.user.count()

      return !findUsers || findUsers.length === 0
        ? null
        : {
            total: countUsers,
            page: payload.page,
            total_pages: Math.ceil(countUsers / payload.limit),
            limit: payload.limit,
            data: findUsers
          }
    } catch (error) {
      Logger.error(
        `[FindAllUsersPrismaRepository.findAll]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.User)
      )
    }
  }
}
