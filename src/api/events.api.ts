import { Event } from '@/types/event'
import events from '../data/events.json'

export const getEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(events), 1000)
  })
}
