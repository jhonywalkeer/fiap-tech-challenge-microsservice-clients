import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { User } from '@domain/entities'

export interface CreateUserRepository
  extends Omit<Repositories<User>, CreateRepository> {}
