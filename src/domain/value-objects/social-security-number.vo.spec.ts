import { HttpException } from '@common/utils/exceptions/http.exception'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'
import { SocialSecurityNumber } from '@domain/value-objects'

const socialSecurityNumberValid = '123.456.789-09'
const socialSecurityNumberInvalid = '123.456.789-0'

describe('[Value Objects] SocialSecurityNumber', () => {
  it('should create a social security number value object', () => {
    const socialSecurityNumber = new SocialSecurityNumber(
      socialSecurityNumberValid
    )

    expect(socialSecurityNumber).toBeInstanceOf(SocialSecurityNumber)
    expect(socialSecurityNumber.getValue()).toBe(
      RemoveDotsAndDashesFormat(socialSecurityNumberValid)
    )
  })

  it('should throw an error when social security number is invalid', () => {
    try {
      new SocialSecurityNumber(socialSecurityNumberInvalid)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })
})
