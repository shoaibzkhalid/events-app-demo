import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Event } from '@/types/event'

import { getEvents } from 'api/events.api'

export const useEventsQuery = (): UseQueryResult<Event[]> => {
  return useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: getEvents,
  })
}
