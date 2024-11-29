import { CreateUserDTO } from '@application/dtos/user'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'
import { User } from '@domain/entities'
import { CreateUserUseCase } from '@domain/usecases/user'
import { CreatedUserMock, InputUserBodyMock } from '@mocks/users'
import { CreateUserController } from '@presentation/controllers/users'

describe('[Controllers] Create User Controller', () => {
  it('should return the user created', async () => {
    const createUserUC: CreateUserUseCase = {
      execute: jest.fn().mockResolvedValue(CreatedUserMock)
    }
    const createUserPresenter: ResponseHandler<User> = {
      response: jest.fn().mockReturnValue(CreatedUserMock)
    }
    const createUserController: Controller<User> = new CreateUserController(
      createUserUC,
      createUserPresenter
    )

    const request: HttpRequest = {
      body: InputUserBodyMock as CreateUserDTO
    }

    const response: HttpResponse<User> =
      await createUserController.handle(request)

    expect(createUserUC.execute).toHaveBeenCalledTimes(1)
    expect(createUserUC.execute).toHaveBeenCalledWith({
      email: InputUserBodyMock.email,
      name: InputUserBodyMock.name,
      social_security_number: RemoveDotsAndDashesFormat(
        InputUserBodyMock.social_security_number
      )
    })
    expect(createUserPresenter.response).toHaveBeenCalledTimes(1)
    expect(createUserPresenter.response).toHaveBeenCalledWith(
      CreatedUserMock,
      StatusCode.Created
    )
    expect(response).toEqual(CreatedUserMock)
  })
})
