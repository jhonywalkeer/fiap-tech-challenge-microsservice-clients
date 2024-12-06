import {
  CreateUserRepository,
  FindUserByConditionRepository,
  FindUserByIdRepository
} from '@application/repositories/user'
import { ErrorName, StatusCode } from '@common/enums'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateUser } from '@domain/interfaces/user'
import { CreateUserUseCase } from '@domain/usecases/user'

export class CreateUserUC implements CreateUserUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findUserByCondition: FindUserByConditionRepository,
    private readonly createUserRepository: CreateUserRepository
  ) {}
  async execute(payload: CreateUser): Promise<UserEntity> | never {
    Logger.info('[CreateUserUC.execute]')

    const findUserBySocialSecurityNumber: UserEntity | null =
      await this.findUserByIdRepository.findById(payload)
    const findUserByEmail: UserEntity[] | null =
      await this.findUserByCondition.findByCondition(payload)

    if (findUserBySocialSecurityNumber || findUserByEmail) {
      const message: string = ExistsError(Field.User)
      Logger.error(
        `[CreateUserUC.execute]: Status Code ${StatusCode.Conflict} | ${message}`
      )
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        message
      )
    }

    return await this.createUserRepository.create(payload)
  }
}
