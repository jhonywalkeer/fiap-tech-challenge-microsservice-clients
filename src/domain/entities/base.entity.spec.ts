import { BaseEntity } from '@domain/entities'
import { InputIdMock } from '@mocks/users'

describe('[Entities] Base Entity', () => {
  it('should create an instance with required properties', () => {
    const id = InputIdMock
    const entity = new BaseEntity(id)

    expect(entity.id).toBe(id)
    expect(entity.create_at).toBeUndefined()
    expect(entity.update_at).toBeUndefined()
    expect(entity.deleted_at).toBeUndefined()
  })

  it('should create an instance with all properties', () => {
    const id = InputIdMock
    const createAt = new Date()
    const updateAt = new Date()
    const deletedAt = new Date()
    const entity = new BaseEntity(id, createAt, updateAt, deletedAt)

    expect(entity.id).toBe(id)
    expect(entity.create_at).toBe(createAt)
    expect(entity.update_at).toBe(updateAt)
    expect(entity.deleted_at).toBe(deletedAt)
  })
})
