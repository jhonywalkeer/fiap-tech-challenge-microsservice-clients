import { FindAllUsersDTO } from '@application/dtos/user'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { PaginateResponse } from '@common/types/paginate-response.type'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { FindAllUsersUseCase } from '@domain/usecases/user'

export class FindAllUsersController
  implements Controller<PaginateResponse<UserEntity> | null>
{
  constructor(
    private readonly findAllUserUC: FindAllUsersUseCase,
    private readonly findAllUserPresenter: ResponseHandler<PaginateResponse<UserEntity> | null>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[FindAllUsersController.handle]')

    const { query } = request
    const users: PaginateResponse<UserEntity> =
      await this.findAllUserUC.execute(
        Object.assign(
          new FindAllUsersDTO(query.page, query.limit, query.sort, query.order)
        )
      )
    return this.findAllUserPresenter.response(users, StatusCode.Sucess)
  }
}
