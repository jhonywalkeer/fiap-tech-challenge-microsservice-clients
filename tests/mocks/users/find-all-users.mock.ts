import { UserEntity } from '@domain/entities'
import { PaginationInputMock } from '@mocks/pagination'
import { FindUserByIdMock, InputIdMock } from '@mocks/users'

export const FindAllUsersMock = [
  FindUserByIdMock,
  {
    email: 'usuario_teste_b@fiap.com.br',
    social_security_number: '713.512.570-30',
    name: 'Usuário de Teste B',
    id: InputIdMock,
    create_at: new Date(),
    update_at: new Date()
  }
]

export const FindAllPaginetedUsersMock = {
  data: FindAllUsersMock as UserEntity[],
  total: FindAllUsersMock.length,
  page: PaginationInputMock.page,
  total_pages: Math.ceil(FindAllUsersMock.length / PaginationInputMock.limit),
  limit: PaginationInputMock.limit
}
