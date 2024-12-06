import { EventIdentifier } from '@common/utils/identifiers'
import { UserEvents } from '@domain/enums'

describe('[Identifier] Event Identifier', () => {
  it('should return the correct event identifier for "find-all-users"', () => {
    const result = EventIdentifier('find-all-users')
    expect(result).toBe(UserEvents.FindAll)
  })

  it('should return the correct event identifier for "find-user-by-id"', () => {
    const result = EventIdentifier('find-user-by-id')
    expect(result).toBe(UserEvents.FindById)
  })

  it('should return UserEvents.Unknown for an unknown event', () => {
    const result = EventIdentifier('any_other_event')
    expect(result).toBe(UserEvents.Unknown)
  })
})
