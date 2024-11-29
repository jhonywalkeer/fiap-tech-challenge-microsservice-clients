import { User } from '@domain/entities'
import { CreateUser } from '@domain/interfaces/user'

export interface CreateUserUseCase {
  execute(payload: CreateUser): Promise<User> | never
}
