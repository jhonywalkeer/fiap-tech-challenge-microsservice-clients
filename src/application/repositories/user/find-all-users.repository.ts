import { Repositories } from '@application/repositories/common'
import { FindAllRepository, PaginateResponse } from '@common/types'
import { UserEntity } from '@domain/entities'

export interface FindAllUsersRepository
  extends Omit<
    Repositories<PaginateResponse<UserEntity> | null>,
    FindAllRepository
  > {}
