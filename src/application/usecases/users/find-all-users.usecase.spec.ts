import { FindAllUsersRepository } from '@application/repositories/user'
import { FindAllUsersUC } from '@application/usecases/users'
import { Pagination } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { UserEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindAllPaginetedUsersMock } from '@mocks/users'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Find All Users Use Case', () => {
  let findAllUsersUC: FindAllUsersUC
  let findAllUsersRepository: jest.Mocked<FindAllUsersRepository>
  let sendMessageAdapter: jest.Mocked<SendMessageAdapter>
  let sendEvent: SendEventGateway
  let logger: jest.SpyInstance

  const queryParameters: PaginationAndFilter = {
    page: Pagination.Default.Page,
    limit: Pagination.Default.Limit
  }
  const users: PaginateResponse<UserEntity> = FindAllPaginetedUsersMock

  beforeEach(() => {
    findAllUsersRepository = {
      findAll: jest.fn()
    } as unknown as jest.Mocked<FindAllUsersRepository>
    sendEvent = new SendEventGateway(sendMessageAdapter)
    findAllUsersUC = new FindAllUsersUC(findAllUsersRepository, sendEvent)
    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a list of users with the pagination and filter', async () => {
    findAllUsersRepository.findAll.mockResolvedValue(users)

    const result: PaginateResponse<UserEntity> =
      await findAllUsersUC.execute(queryParameters)

    expect(findAllUsersUC.execute).toBeInstanceOf(Function)
    expect(findAllUsersRepository.findAll).toHaveBeenCalledTimes(1)
    expect(findAllUsersRepository.findAll).toHaveBeenCalledWith(queryParameters)
    expect(logger).toHaveBeenCalledWith('[FindAllUsersUC.execute]')
    expect(result).toBe(users)
  })

  it('should throw an HttpException when find all users fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Find,
      Field.User
    )

    jest
      .spyOn(findAllUsersRepository, 'findAll')
      .mockRejectedValue(httpException)

    expect(() => findAllUsersUC.execute(queryParameters)).rejects.toThrow(
      httpException
    )

    expect(httpException.statusCode).toBe(StatusCode.NotFound)
    expect(httpException.name).toBe(ErrorName.NotFoundInformation)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Find, Field.User)
    )
  })

  it('should throw an HttpException when not found find all users', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Find,
      Field.User
    )

    findAllUsersRepository.findAll.mockResolvedValue(null)

    expect(() => findAllUsersUC.execute(queryParameters)).rejects.toThrow(
      httpException
    )

    expect(httpException.statusCode).toBe(StatusCode.NotFound)
    expect(httpException.name).toBe(ErrorName.NotFoundInformation)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Find, Field.User)
    )
  })

  it('should send an event when the event parameter is true', async () => {
    const queryParameters: PaginationAndFilter = {
      page: Pagination.Default.Page,
      limit: Pagination.Default.Limit,
      event: true
    }

    findAllUsersRepository.findAll.mockResolvedValue(users)
    sendEvent.execute = jest.fn()

    await findAllUsersUC.execute(queryParameters)

    expect(sendEvent.execute).toHaveBeenCalled()
  })
})
