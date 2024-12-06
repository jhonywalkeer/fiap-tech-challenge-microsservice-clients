import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'
import { UserEntity } from '@domain/entities'

export interface FindUserByIdRepository
  extends Omit<Repositories<UserEntity | null>, FindByIdRepository> {}
