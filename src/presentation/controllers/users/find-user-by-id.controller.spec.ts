import { FindUserByIdDTO } from '@application/dtos/user'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { UserEntity } from '@domain/entities'
import { FindUserByIdUseCase } from '@domain/usecases/user'
import { FindUserByIdInputMock, FindUserByIdMock } from '@mocks/users'
import { FindByIdController } from '@presentation/controllers/users'

describe('[Controllers] Find User By Id Controller', () => {
  it('should return the user found', async () => {
    const findUserByIdUC: FindUserByIdUseCase = {
      execute: jest.fn().mockResolvedValue(FindUserByIdMock as UserEntity)
    }
    const findUserByIdPresenter: ResponseHandler<UserEntity> = {
      response: jest.fn().mockReturnValue(FindUserByIdMock as UserEntity)
    }
    const findUserByIdController: Controller<UserEntity> =
      new FindByIdController(findUserByIdUC, findUserByIdPresenter)

    const request: HttpRequest = {
      params: {
        cpf: FindUserByIdInputMock
      }
    }

    const response: HttpResponse<UserEntity> =
      await findUserByIdController.handle(request)

    expect(findUserByIdUC.execute).toHaveBeenCalledTimes(1)
    expect(findUserByIdUC.execute).toHaveBeenCalledWith(
      Object.assign(new FindUserByIdDTO(request.params.cpf))
    )
    expect(findUserByIdPresenter.response).toHaveBeenCalledTimes(1)
    expect(findUserByIdPresenter.response).toHaveBeenCalledWith(
      FindUserByIdMock as UserEntity,
      StatusCode.Sucess
    )
    expect(response).toEqual(FindUserByIdMock as UserEntity)
  })
})
