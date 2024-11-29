import { StatusCode, ErrorName } from '@common/enums'
import { FieldIncorrectError } from '@common/errors/field-incorrect.error'
import { HttpException } from '@common/utils/exceptions/http.exception'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'
import { Field } from '@domain/enums'

export class SocialSecurityNumber {
  private readonly value: string

  constructor(value: string) {
    this.value = SocialSecurityNumber.validate(value)
  }

  private static validate(value: string): string {
    const removeSpecialCharacters = RemoveDotsAndDashesFormat(value)
    const isCorrectLength = removeSpecialCharacters.length === 11

    if (!removeSpecialCharacters || !isCorrectLength) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        FieldIncorrectError(Field.SocialSecurityNumber)
      )
    }

    return removeSpecialCharacters
  }

  public getValue(): string {
    return this.value
  }
}
