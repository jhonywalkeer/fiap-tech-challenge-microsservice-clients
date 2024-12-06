import { FindUserByIdRepository } from '@application/repositories/user'
import { FindUserByIdUC } from '@application/usecases/users'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { FindUserByIdUseCase } from '@domain/usecases/user'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindUserByIdInputMock, FindUserByIdMock } from '@mocks/users'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Find User By Id Use Case', () => {
  let findUserByIdUC: FindUserByIdUseCase
  let findUserByIdRepository: jest.Mocked<FindUserByIdRepository>
  let sendMessageAdapter: jest.Mocked<SendMessageAdapter>
  let sendEvent: SendEventGateway
  let logger: jest.SpyInstance

  const users: UserEntity | null = FindUserByIdMock

  beforeEach(() => {
    findUserByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindUserByIdRepository>
    sendEvent = new SendEventGateway(sendMessageAdapter)
    findUserByIdUC = new FindUserByIdUC(findUserByIdRepository, sendEvent)
    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a list of users with the pagination and filter', async () => {
    const pathParameters: FindUserBySocialSecurityNumber = {
      social_security_number: FindUserByIdInputMock
    }

    findUserByIdRepository.findById.mockResolvedValue(users)

    const result: UserEntity = await findUserByIdUC.execute(pathParameters)

    expect(logger).toHaveBeenCalledWith('[FindUserByIdUC.execute]')
    expect(findUserByIdRepository.findById).toHaveBeenCalledWith(pathParameters)
    expect(result).toBe(users)
  })

  it('should throw an HttpException when not found user by id', async () => {
    const pathParameters: FindUserBySocialSecurityNumber = {
      social_security_number: FindUserByIdInputMock
    }

    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Find,
      Field.User
    )

    findUserByIdRepository.findById.mockResolvedValue(null)

    expect(() => findUserByIdUC.execute(pathParameters)).rejects.toThrow(
      httpException
    )

    expect(httpException.statusCode).toBe(StatusCode.NotFound)
    expect(httpException.name).toBe(ErrorName.NotFoundInformation)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Find, Field.User)
    )
  })

  it('should send an event when the event parameter is true', async () => {
    const pathParameters: FindUserBySocialSecurityNumber = {
      social_security_number: FindUserByIdInputMock,
      event: true
    }

    findUserByIdRepository.findById.mockResolvedValue(users)
    sendEvent.execute = jest.fn()

    await findUserByIdUC.execute(pathParameters)

    expect(sendEvent.execute).toHaveBeenCalled()
  })
})
