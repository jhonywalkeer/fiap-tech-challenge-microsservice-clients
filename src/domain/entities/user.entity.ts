import { BaseEntity } from '@domain/entities'

export class UserEntity extends BaseEntity {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly social_security_number: string,
    id: string,
    create_at?: Date,
    update_at?: Date,
    deleted_at?: Date
  ) {
    super(id, create_at, update_at, deleted_at)
  }
}
