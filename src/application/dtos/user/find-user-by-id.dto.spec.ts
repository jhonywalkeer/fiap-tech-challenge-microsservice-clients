import { FindUserByIdDTO } from '@application/dtos/user'
import { EmptyFiller } from '@common/constants'
import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'
import { InputUserParamMock } from '@mocks/users'
import { IsValidParameterValidator } from '@presentation/validators'
import { InvalidParamStub } from '@stubs/exceptions'

jest.mock('@presentation/validators', () => ({
  IsValidParameterValidator: jest.fn()
}))

describe(`[DTO's] Find User By Id DTO`, () => {
  it('should call with the correct social security number', () => {
    const value: string = InputUserParamMock
    const formattedValue: string = RemoveDotsAndDashesFormat(InputUserParamMock)
    const dto = new FindUserByIdDTO(value)

    expect(IsValidParameterValidator).toHaveBeenCalledWith(formattedValue)
    expect(dto.social_security_number).toBe(formattedValue)
  })

  it('should throw an error if social security number is empty string provided', () => {
    expect(() => new FindUserByIdDTO(EmptyFiller)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if social security number is null provided', () => {
    expect(() => new FindUserByIdDTO(null as any)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if social security number is undefined provided', () => {
    expect(() => new FindUserByIdDTO(undefined as any)).toThrow(
      InvalidParamStub
    )
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })
})
