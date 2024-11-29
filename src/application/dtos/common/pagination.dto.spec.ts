import { PaginateDTO } from '@application/dtos/common'
import { LimitDefault, PageDefault } from '@common/constants'
import { ErrorName, Ordenation, StatusCode } from '@common/enums'
import { ValueIncorrectError } from '@common/errors'
import { Field } from '@domain/enums'
import {
  InvalidOrderMock,
  LimitMock,
  OrderMock,
  PageMock,
  SortMock
} from '@mocks/pagination'
import { InvalidValueStub } from '@stubs/exceptions'

describe(`[DTO's] Pagination DTO`, () => {
  it('should return the default values if no value is provided', () => {
    const result: PaginateDTO = new PaginateDTO()

    expect(result.page).toBe(PageDefault)
    expect(result.limit).toBe(LimitDefault)
    expect(result.sort).toBeUndefined()
    expect(result.order).toBe(Ordenation.ASC)
  })

  it('should return the values if they are valid', () => {
    const result: PaginateDTO = new PaginateDTO(
      PageMock,
      LimitMock,
      SortMock,
      OrderMock
    )

    expect(result.page).toBe(PageMock)
    expect(result.limit).toBe(LimitMock)
    expect(result.sort).toBe(SortMock)
    expect(result.order).toBe(OrderMock)
  })

  it('should return the default values if no page informed', () => {
    const result: PaginateDTO = new PaginateDTO(
      undefined,
      LimitMock,
      undefined,
      OrderMock
    )

    expect(result.page).toBe(PageDefault)
    expect(result.limit).toBe(LimitDefault)
    expect(result.sort).toBeUndefined()
    expect(result.order).toBe(Ordenation.ASC)
  })

  it('should return the default values if no limit informed', () => {
    const result: PaginateDTO = new PaginateDTO(
      PageMock,
      undefined,
      undefined,
      OrderMock
    )

    expect(result.page).toBe(PageDefault)
    expect(result.limit).toBe(LimitDefault)
    expect(result.sort).toBeUndefined()
    expect(result.order).toBe(Ordenation.ASC)
  })

  it('should throw an exception if the order parameter is invalid', () => {
    expect(() => {
      new PaginateDTO(PageMock, LimitMock, SortMock, InvalidOrderMock)
    }).toThrow(InvalidValueStub)
    expect(InvalidValueStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidValueStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidValueStub.message).toBe(ValueIncorrectError(Field.Order))
  })
})
