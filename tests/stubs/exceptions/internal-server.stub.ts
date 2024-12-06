import { StatusCode, ErrorName } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'

export const InternalServerStub = (message: string): HttpException => {
  return new HttpException(
    StatusCode.InternalServerError,
    ErrorName.InternalError,
    message
  )
}
