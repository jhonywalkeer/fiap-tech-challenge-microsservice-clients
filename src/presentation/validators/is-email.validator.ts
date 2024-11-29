import { Email } from '@domain/value-objects'

export const IsEmailValidator = (value: string): string => {
  return new Email(value).getValue()
}
