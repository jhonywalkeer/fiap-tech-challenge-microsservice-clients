import { QueueEvent } from '@common/interfaces'

export interface FindUserBySocialSecurityNumber extends QueueEvent {
  social_security_number: string
}
