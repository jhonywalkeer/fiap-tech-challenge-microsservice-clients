import { UserEntity } from '@domain/entities'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'

export interface FindUserByIdUseCase {
  execute(pathParameters: FindUserBySocialSecurityNumber): Promise<UserEntity>
}
