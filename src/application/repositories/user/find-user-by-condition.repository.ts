import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { User } from '@domain/entities'

export interface FindUserByConditionRepository
  extends Omit<Repositories<User[] | null>, FindByConditionRepository> {}
