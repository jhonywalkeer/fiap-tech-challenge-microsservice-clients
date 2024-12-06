import { Pagination } from '@common/constants'

export const PaginationFilter = (page: number, limit: number) => {
  return !page || !limit
    ? { skip: 0, take: Pagination.Default.Limit }
    : { skip: (page - 1) * limit, take: limit }
}
