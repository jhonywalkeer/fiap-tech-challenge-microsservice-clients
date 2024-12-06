import { FindAllUsersUC, FindUserByIdUC } from '@application/usecases/users'
import { UserEvents } from '@domain/enums'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindAllUsersPrismaRepository,
  FindUserByIdPrismaRepository
} from '@infrastructure/persistence/database/repositories/user'
import { SendMessageAdapter } from '@main/adapters/queues/producers'

export class TriggerUCFactory {
  static execute(usecase: string, message: any): any | null {
    const findAllUC = new FindAllUsersUC(
      new FindAllUsersPrismaRepository(new DatabaseConnection()),
      new SendEventGateway(new SendMessageAdapter())
    )

    const findByIdUC = new FindUserByIdUC(
      new FindUserByIdPrismaRepository(new DatabaseConnection()),
      new SendEventGateway(new SendMessageAdapter())
    )

    switch (usecase) {
      case UserEvents.FindById:
        return findByIdUC.execute({ ...message, event: true })
      case UserEvents.FindAll:
        return findAllUC.execute({ ...message, event: true })
      default:
        return null
    }
  }
}
