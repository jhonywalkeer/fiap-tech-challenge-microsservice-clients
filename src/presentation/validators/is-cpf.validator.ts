import { SocialSecurityNumber } from '@domain/value-objects'

export const IsSocialSecurityNumberValidator = (value: string): string => {
  return new SocialSecurityNumber(value).getValue()
}
