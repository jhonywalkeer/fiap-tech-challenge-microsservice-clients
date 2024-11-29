import { FindAllUsersRepository } from '@application/repositories/user'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllUsersUseCase } from '@domain/usecases/user'

export class FindAllUsersUC implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository
  ) {}
  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<User>> {
    Logger.info('[FindAllUsersUC.execute]')
    const findUsers: PaginateResponse<User> | null =
      await this.findAllUsersRepository.findAll(queryParameters)

    if (!findUsers) {
      Logger.error('[FindAllUsersUC.execute] Users not found')
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotOccurredError(Operation.Find, Field.User)
      )
    }

    return findUsers
  }
}
