import { ErrorName, StatusCode } from '@common/enums'
import { InvalidBodyError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import {
  IsStringValidator,
  IsEmailValidator,
  IsSocialSecurityNumberValidator
} from '@presentation/validators'

export class CreateUserDTO {
  name: string
  email: string
  social_security_number: string

  constructor(name: string, email: string, social_security_number: string) {
    if (!name || !email || !social_security_number) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        InvalidBodyError()
      )
    }
    IsStringValidator(email, Field.Email)
    IsStringValidator(social_security_number, Field.SocialSecurityNumber)

    this.name = IsStringValidator(name, Field.Name)
    this.email = IsEmailValidator(email)
    this.social_security_number = IsSocialSecurityNumberValidator(
      social_security_number
    )
  }
}
