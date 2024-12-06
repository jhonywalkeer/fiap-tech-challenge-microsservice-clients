import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { UserEntity } from '@domain/entities'

export interface CreateUserRepository
  extends Omit<Repositories<UserEntity>, CreateRepository> {}
