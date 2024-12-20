import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { UserEntity } from '@domain/entities'

export interface FindAllUsersUseCase {
  execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<UserEntity>>
}
