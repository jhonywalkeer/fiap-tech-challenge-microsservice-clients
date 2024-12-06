import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { UserEntity } from '@domain/entities'

export interface FindUserByConditionRepository
  extends Omit<Repositories<UserEntity[] | null>, FindByConditionRepository> {}
