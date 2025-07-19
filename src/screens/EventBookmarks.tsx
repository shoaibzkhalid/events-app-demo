import EventsList from '@/components/event/EventsList'
import { useEventStore } from '@/stores/event.store'

export default function EventBookmarks() {
  const events = useEventStore((store) => store.bookmarkedEvents)

  return <EventsList title="Bookmarked events" events={events} />
}
