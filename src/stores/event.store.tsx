import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Event } from '@/types/event'
import { zustandStorage } from '@/utils/storage'

interface EventState {
  bookmarkedEvents: Event[]
  toggleBookmark: (event: Event) => void
  clearStorage: () => void
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      bookmarkedEvents: [],

      toggleBookmark: (event: Event) =>
        set((state) => {
          const exists = state.bookmarkedEvents.find((e) => e.id === event.id)
          return {
            bookmarkedEvents: exists
              ? state.bookmarkedEvents.filter((e) => e.id !== event.id)
              : [...state.bookmarkedEvents, { ...event, isBookmarked: true }],
          }
        }),

      clearStorage: async () => set(() => ({ bookmarkedEvents: [] })),
    }),
    {
      name: 'event-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
