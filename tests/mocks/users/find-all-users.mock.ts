import { User } from '@domain/entities'
import { PaginationInputMock } from '@mocks/pagination'
import { FindUserByIdMock } from '@mocks/users'

export const FindAllUsersMock = [
  FindUserByIdMock,
  {
    email: 'usuario_teste_b@fiap.com.br',
    social_security_number: '713.512.570-30',
    name: 'Usuário de Teste B',
    id: '4add7427-6466-4280-b620-37c2a2e6b99d',
    create_at: new Date(),
    update_at: new Date()
  }
]

export const FindAllPaginetedUsersMock = {
  data: FindAllUsersMock as User[],
  total: FindAllUsersMock.length,
  page: PaginationInputMock.page,
  total_pages: Math.ceil(FindAllUsersMock.length / PaginationInputMock.limit),
  limit: PaginationInputMock.limit
}
