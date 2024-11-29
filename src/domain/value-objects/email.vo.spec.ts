import { HttpException } from '@common/utils/exceptions'
import { Email } from '@domain/value-objects'

const emailValid = 'email_test@fiap.com.br'
const emailInvalid = 'email_invalid'

describe('[Value Objects] Email', () => {
  it('should create an email value object', () => {
    const email = new Email(emailValid)

    expect(email).toBeInstanceOf(Email)
    expect(email.getValue()).toBe(emailValid)
  })

  it('should throw an error when email is invalid', () => {
    try {
      new Email(emailInvalid)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })
})
