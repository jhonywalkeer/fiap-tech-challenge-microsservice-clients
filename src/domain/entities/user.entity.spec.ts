import { UserEntity } from '@domain/entities'
import { InputIdMock, InputUserBodyMock } from '@mocks/users'

describe('UserEntity', () => {
  it('should create an instance with required properties', () => {
    const user = new UserEntity(
      InputUserBodyMock.name,
      InputUserBodyMock.email,
      InputUserBodyMock.social_security_number,
      InputIdMock
    )

    expect(user.id).toBe(InputIdMock)
    expect(user.name).toBe(InputUserBodyMock.name)
    expect(user.email).toBe(InputUserBodyMock.email)
    expect(user.social_security_number).toBe(
      InputUserBodyMock.social_security_number
    )
    expect(user.create_at).toBeUndefined()
    expect(user.update_at).toBeUndefined()
    expect(user.deleted_at).toBeUndefined()
  })

  it('should create an instance with all properties', () => {
    const createAt = new Date()
    const updateAt = new Date()
    const deletedAt = new Date()

    const user = new UserEntity(
      InputUserBodyMock.name,
      InputUserBodyMock.email,
      InputUserBodyMock.social_security_number,
      InputIdMock,
      createAt,
      updateAt,
      deletedAt
    )

    expect(user.id).toBe(InputIdMock)
    expect(user.name).toBe(InputUserBodyMock.name)
    expect(user.email).toBe(InputUserBodyMock.email)
    expect(user.social_security_number).toBe(
      InputUserBodyMock.social_security_number
    )
    expect(user.create_at).toBe(createAt)
    expect(user.update_at).toBe(updateAt)
    expect(user.deleted_at).toBe(deletedAt)
  })
})
