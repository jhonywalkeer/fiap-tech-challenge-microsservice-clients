import { IsSocialSecurityNumberValidator } from './is-cpf.validator'

describe('[Validators] Is Social Security Number', () => {
  it('should return social security number formated if CPF is valid', () => {
    const cpf: string = '123.456.789-09'
    const isValid: string = IsSocialSecurityNumberValidator(cpf)
    expect(isValid).toBe('12345678909')
  })
})
