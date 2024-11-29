import {
  CreateUserRepository,
  FindUserByConditionRepository,
  FindUserByIdRepository
} from '@application/repositories/user'
import { ErrorName, StatusCode } from '@common/enums'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateUser } from '@domain/interfaces/user'
import { CreateUserUseCase } from '@domain/usecases/user'

export class CreateUserUC implements CreateUserUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findUserByCondition: FindUserByConditionRepository,
    private readonly createUserRepository: CreateUserRepository
  ) {}
  async execute(payload: CreateUser): Promise<User> | never {
    Logger.info('[CreateUserUC.execute]')
    const findUserBySocialSecurityNumber =
      await this.findUserByIdRepository.findById(payload)
    const findUserByEmail =
      await this.findUserByCondition.findByCondition(payload)

    if (findUserBySocialSecurityNumber || findUserByEmail) {
      Logger.error('[CreateUserUC.execute] User already exists')
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ExistsError(Field.User)
      )
    }

    return await this.createUserRepository.create(payload)
  }
}
