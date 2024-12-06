export const QueueAttributeName = 'All'

export const Queue = {
  MaxNumberOfMessages: 5,
  WaitTimeSeconds: 10,
  Clients: {
    Name: process.env.CLIENT_QUEUE_URL as string
  },
  Order: {
    Name: process.env.ORDER_QUEUE_URL as string
  }
}
