import { CreateUserMock } from '@mocks/users'

export const FindUserByIdMock = {
  ...CreateUserMock,
  id: '25097f13-505f-4236-9901-f9998add2b31',
  create_at: new Date(),
  update_at: new Date()
}

export const FindUserByIdInputMock = FindUserByIdMock.social_security_number
