import { CreateUserMock, InputIdMock } from '@mocks/users'

export const FindUserByIdMock = {
  ...CreateUserMock,
  id: InputIdMock,
  create_at: new Date(),
  update_at: new Date()
}

export const FindUserByIdInputMock = FindUserByIdMock.social_security_number
