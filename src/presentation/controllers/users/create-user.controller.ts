import { CreateUserDTO } from '@application/dtos/user'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { CreateUserUseCase } from '@domain/usecases/user'

export class CreateUserController implements Controller<UserEntity> {
  constructor(
    private readonly createUserUC: CreateUserUseCase,
    private readonly createUserPresenter: ResponseHandler<UserEntity>
  ) {}
  async handle(body: HttpRequest) {
    Logger.info('[CreateUserController.handle]')

    const payload = Object.assign(
      new CreateUserDTO(
        body.body.name,
        body.body.email,
        body.body.social_security_number
      )
    )
    const user: UserEntity = await this.createUserUC.execute(payload)
    return this.createUserPresenter.response(user, StatusCode.Created)
  }
}
