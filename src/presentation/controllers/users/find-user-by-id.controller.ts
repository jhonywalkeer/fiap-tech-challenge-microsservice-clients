import { FindUserByIdDTO } from '@application/dtos/user'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { User } from '@domain/entities'
import { FindUserByIdUseCase } from '@domain/usecases/user'

export class FindByIdController implements Controller<User> {
  constructor(
    private readonly findUserByIdUC: FindUserByIdUseCase,
    private readonly findUserByIdPresenter: ResponseHandler<User>
  ) {}
  async handle(pathParameters: HttpRequest) {
    Logger.info('[FindByIdController.handle]')
    const { cpf } = pathParameters.params
    const parameters: FindUserByIdDTO = Object.assign(new FindUserByIdDTO(cpf))
    const user: User = await this.findUserByIdUC.execute(parameters)

    return this.findUserByIdPresenter.response(user, StatusCode.Sucess)
  }
}
