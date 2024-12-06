import { UserEvents } from '@domain/enums'

export const EventIdentifier = (event: string): string => {
  const eventMap: { [key: string]: string } = {
    'find-all-users': UserEvents.FindAll,
    'find-user-by-id': UserEvents.FindById
  }

  return eventMap[event] || UserEvents.Unknown
}
