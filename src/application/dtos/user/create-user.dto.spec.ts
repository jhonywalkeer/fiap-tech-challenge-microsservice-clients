import { CreateUserDTO } from '@application/dtos/user'
import { EmptyFiller } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { InvalidBodyError } from '@common/errors'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'
import {
  InputUserBodyMock,
  CreateUserMock,
  InvalidUserMailMock
} from '@mocks/users'
import { InvalidBodyStub } from '@stubs/exceptions'

describe(`[DTO's] Create User DTO`, () => {
  it('should create an instance of CreateUserDTO', () => {
    const body: CreateUserDTO = new CreateUserDTO(
      InputUserBodyMock.name,
      InputUserBodyMock.email,
      InputUserBodyMock.social_security_number
    )
    expect(body).toBeInstanceOf(CreateUserDTO)
    expect(body.name).toBe(CreateUserMock.name)
    expect(body.email).toBe(CreateUserMock.email)
    expect(body.social_security_number).toBe(
      RemoveDotsAndDashesFormat(CreateUserMock.social_security_number)
    )
  })

  it('should throw an exception if the body is invalid', () => {
    expect(() => {
      new CreateUserDTO(EmptyFiller, InvalidUserMailMock, EmptyFiller)
    }).toThrow(InvalidBodyStub)
    expect(InvalidBodyStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidBodyStub.name).toBe(ErrorName.InvalidBody)
    expect(InvalidBodyStub.message).toBe(InvalidBodyError())
  })

  it('should throw an exception if the expected body property is null', () => {
    expect(() => {
      new CreateUserDTO(null as any, null as any, null as any)
    }).toThrow(InvalidBodyStub)
    expect(InvalidBodyStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidBodyStub.name).toBe(ErrorName.InvalidBody)
    expect(InvalidBodyStub.message).toBe(InvalidBodyError())
  })

  it('should throw an exception if the expected body property is undefined', () => {
    expect(() => {
      new CreateUserDTO(undefined as any, undefined as any, undefined as any)
    }).toThrow(InvalidBodyStub)
    expect(InvalidBodyStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidBodyStub.name).toBe(ErrorName.InvalidBody)
    expect(InvalidBodyStub.message).toBe(InvalidBodyError())
  })
})
