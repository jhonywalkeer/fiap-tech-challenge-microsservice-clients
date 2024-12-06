import { UserEventMap } from '@application/mappers'
import { Gateway } from '@application/protocols/http'
import { FindUserByIdRepository } from '@application/repositories/user'
import { Queue } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field, UserEvents } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { FindUserByIdUseCase } from '@domain/usecases/user'

export class FindUserByIdUC implements FindUserByIdUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly sendEvent: Gateway<UserEntity>
  ) {}
  async execute(
    pathParameters: FindUserBySocialSecurityNumber
  ): Promise<UserEntity> {
    Logger.info('[FindUserByIdUC.execute]')

    const findUser: UserEntity | null =
      await this.findUserByIdRepository.findById(pathParameters)

    if (!findUser) {
      const message: string = NotOccurredError(Operation.Find, Field.User)
      Logger.error(
        `[FindUserByIdUC.execute]  Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    pathParameters.event
      ? this.sendEvent.execute(
          UserEventMap.execute(Queue.Order.Name, UserEvents.FindById, findUser)
        )
      : false

    return findUser
  }
}
