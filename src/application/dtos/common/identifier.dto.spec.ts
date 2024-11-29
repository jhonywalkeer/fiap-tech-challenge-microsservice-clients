import { IdentifierDTO } from '@application/dtos/common'
import { ErrorName, StatusCode } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { IsValidParameterValidator } from '@presentation/validators'
import { InvalidParamStub } from '@stubs/exceptions'

jest.mock('@presentation/validators/is-valid-parameter')

describe(`[DTO's] Identifier DTO`, () => {
  it('should call with the correct id', () => {
    const value: string = '1'
    new IdentifierDTO(value)

    expect(IsValidParameterValidator).toHaveBeenCalledWith(value)
  })

  it('should throw an error if id is empty string', () => {
    expect(() => new IdentifierDTO('')).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is null', () => {
    expect(() => new IdentifierDTO(null as any)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is undefined', () => {
    expect(() => new IdentifierDTO(undefined as any)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })
})
