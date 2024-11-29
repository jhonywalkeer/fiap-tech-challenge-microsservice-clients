import { CreateUserDTO } from '@application/dtos/user'
import { CreateUserRepository } from '@application/repositories/user'
import { StatusCode, ErrorName, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateUserPrismaRepository implements CreateUserRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreateUserDTO): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          social_security_number: body.social_security_number
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Create, Field.User)
      )
    }
  }
}
