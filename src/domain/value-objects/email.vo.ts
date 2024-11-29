import { ValidEmails } from '@common/constants/valid-emails.constant'
import { StatusCode, ErrorName } from '@common/enums'
import { FieldIncorrectError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'

export class Email {
  private readonly value: string

  constructor(value: string) {
    this.value = Email.validate(value)
  }

  private static validate(value: string): string {
    const isEmail = value.includes('@')
    const isValid = ValidEmails.some((email: string) =>
      value?.toLowerCase().endsWith(email)
    )

    if (!isValid || !isEmail) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        FieldIncorrectError(Field.Email)
      )
    }

    return value
  }

  public getValue(): string {
    return this.value
  }
}
