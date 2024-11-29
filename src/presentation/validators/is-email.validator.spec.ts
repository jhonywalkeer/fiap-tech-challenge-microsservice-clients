import { IsEmailValidator } from './is-email.validator'

describe('[Validators] Is Email', () => {
  it('should return email formated if email is valid', () => {
    const email: string = 'email.teste@fiap.com.br'
    const isValid: string = IsEmailValidator(email)

    expect(isValid).toBe(email)
  })
})
