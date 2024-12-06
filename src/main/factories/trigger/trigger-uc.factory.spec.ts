import { FindAllUsersUC, FindUserByIdUC } from '@application/usecases/users'
import { UserEvents } from '@domain/enums'
import { TriggerUCFactory } from '@main/factories/trigger'

jest.mock('@application/usecases/users')
jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/user')
jest.mock('@infrastructure/gateways/queues')
jest.mock('@main/adapters/queues/producers')

describe('[Factories] TriggerUC Factory', () => {
  const mockMessage = { id: 1, name: 'Test User' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should execute FindUserByIdUC when usecase is FindById', async () => {
    const executeMock = jest.fn().mockResolvedValue('findByIdResult')
    FindUserByIdUC.prototype.execute = executeMock

    const result = await TriggerUCFactory.execute(
      UserEvents.FindById,
      mockMessage
    )

    expect(executeMock).toHaveBeenCalledWith({ ...mockMessage, event: true })
    expect(result).toBe('findByIdResult')
  })

  it('should execute FindAllUsersUC when usecase is FindAll', async () => {
    const executeMock = jest.fn().mockResolvedValue('findAllResult')
    FindAllUsersUC.prototype.execute = executeMock

    const result = await TriggerUCFactory.execute(
      UserEvents.FindAll,
      mockMessage
    )

    expect(executeMock).toHaveBeenCalledWith({ ...mockMessage, event: true })
    expect(result).toBe('findAllResult')
  })

  it('should return null when usecase is not recognized', async () => {
    const result = await TriggerUCFactory.execute('UnknownUsecase', mockMessage)

    expect(result).toBeNull()
  })
})
