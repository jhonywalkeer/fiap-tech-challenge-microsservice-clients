export const InputUserBodyMock = {
  email: 'usuario_teste@fiap.com.br',
  social_security_number: '761.638.630-03',
  name: 'Usuário de Teste'
}

export const InputIdMock = '25097f13-505f-4236-9901-f9998add2b31'

export const InputUserParamMock = InputUserBodyMock.social_security_number

export const InputUserMailMock = InputUserBodyMock.email

export const CreateUserMock = InputUserBodyMock

export const CreatedUserMock = {
  id: InputIdMock,
  created_at: new Date(),
  ...CreateUserMock
}

export const ExpectedCreatedUser = {}

export const InvalidUserMailMock = 'invalid_email'
