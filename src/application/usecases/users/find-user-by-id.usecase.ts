import { FindUserByIdRepository } from '@application/repositories/user'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { FindUserByIdUseCase } from '@domain/usecases/user'

export class FindUserByIdUC implements FindUserByIdUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}
  async execute(pathParameters: FindUserBySocialSecurityNumber): Promise<User> {
    Logger.info('[FindUserByIdUC.execute]')
    const findUser: User | null =
      await this.findUserByIdRepository.findById(pathParameters)

    if (!findUser) {
      Logger.error('[FindUserByIdUC.execute] User not found')
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotOccurredError(Operation.Find, Field.User)
      )
    }
    return findUser
  }
}
