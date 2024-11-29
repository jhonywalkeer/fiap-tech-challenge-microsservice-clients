import { ErrorName, StatusCode } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'
import { IsValidParameterValidator } from '@presentation/validators'

export class FindUserByIdDTO {
  social_security_number: string

  constructor(social_security_number: string) {
    if (!social_security_number)
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        InvalidParamError()
      )

    social_security_number = RemoveDotsAndDashesFormat(social_security_number)
    IsValidParameterValidator(social_security_number)

    this.social_security_number = social_security_number
  }
}
