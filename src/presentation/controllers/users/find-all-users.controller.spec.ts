import { FindAllUsersDTO } from '@application/dtos/user'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { PaginateResponse } from '@common/types/paginate-response.type'
import { User } from '@domain/entities'
import { FindAllUsersUseCase } from '@domain/usecases/user'
import { PaginationInputMock } from '@mocks/pagination'
import { FindAllPaginetedUsersMock, FindAllUsersMock } from '@mocks/users'
import { FindAllUsersController } from '@presentation/controllers/users'

describe('[Controllers] Find All Users Controller', () => {
  it('should return all users', async () => {
    const findAllUserUC: FindAllUsersUseCase = {
      execute: jest.fn().mockResolvedValue({
        data: FindAllUsersMock as User[],
        total: FindAllUsersMock.length
      })
    }
    const findAllUserPresenter: ResponseHandler<PaginateResponse<User> | null> =
      {
        response: jest.fn().mockReturnValue(FindAllPaginetedUsersMock)
      }
    const findAllUsersController: Controller<PaginateResponse<User> | null> =
      new FindAllUsersController(findAllUserUC, findAllUserPresenter)

    const request: HttpRequest = {
      query: PaginationInputMock
    }

    const response: HttpResponse<PaginateResponse<User> | null> =
      await findAllUsersController.handle(request)

    expect(findAllUserUC.execute).toHaveBeenCalledTimes(1)
    expect(findAllUserUC.execute).toHaveBeenCalledWith(
      Object.assign(
        new FindAllUsersDTO(
          request.query.page,
          request.query.limit,
          request.query.sort,
          request.query.order
        )
      )
    )
    expect(findAllUserPresenter.response).toHaveBeenCalledTimes(1)
    expect(findAllUserPresenter.response).toHaveBeenCalledWith(
      {
        data: FindAllUsersMock as User[],
        total: FindAllUsersMock.length
      },
      StatusCode.Sucess
    )
    expect(response).toEqual(FindAllPaginetedUsersMock)
  })
})
