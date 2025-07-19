import { Event } from './event'

export type RootStackParamList = {
  Home: undefined
  Profile: { userId: string }
  EventsHome: undefined
  EventsList: undefined
  EventDetails: { event: Event }
}
