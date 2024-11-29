import { Repositories } from '@application/repositories/common'
import { FindAllRepository, PaginateResponse } from '@common/types'
import { User } from '@domain/entities'

export interface FindAllUsersRepository
  extends Omit<
    Repositories<PaginateResponse<User> | null>,
    FindAllRepository
  > {}
