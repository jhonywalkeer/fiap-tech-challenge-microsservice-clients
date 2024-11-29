import { EmptyFiller } from '@common/constants'

export const RemoveDotsAndDashesFormat = (input: string): string => {
  const pattern = /[.-]/g

  return input.replace(pattern, EmptyFiller)
}
