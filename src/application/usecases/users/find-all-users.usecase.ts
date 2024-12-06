import { UserEventMap } from '@application/mappers'
import { Gateway } from '@application/protocols/http'
import { FindAllUsersRepository } from '@application/repositories/user'
import { Queue } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field, UserEvents } from '@domain/enums'
import { FindAllUsersUseCase } from '@domain/usecases/user'

export class FindAllUsersUC implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository,
    private readonly sendEvent: Gateway<UserEntity>
  ) {}
  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<UserEntity>> {
    Logger.info('[FindAllUsersUC.execute]')

    const findUsers: PaginateResponse<UserEntity> | null =
      await this.findAllUsersRepository.findAll(queryParameters)

    if (!findUsers) {
      const message: string = NotOccurredError(Operation.Find, Field.User)
      Logger.error(
        `[FindAllUsersUC.execute] Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    queryParameters.event
      ? this.sendEvent.execute(
          UserEventMap.execute(
            Queue.Order.Name,
            UserEvents.FindAll,
            findUsers.data
          )
        )
      : false

    return findUsers
  }
}
