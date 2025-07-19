import { View, Text } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

import { Event } from '@/types/event'
import { useEventStore } from '@/stores/event.store'

import BackButton from '@/components/BackButton'
import CustomImage from '@/components/CustomImage'
import FavoriteButton from '@/components/FavoriteButton'
import AddToCalendarButton from '@/components/event/AddToCalendar'

export default function EventDetails() {
  const toggleBookmark = useEventStore((store) => store.toggleBookmark)
  const route = useRoute<RouteProp<{ params: { event: Event } }, 'params'>>()
  const event = route.params.event

  const infoRows = [
    { label: 'Location', value: event.location },
    { label: 'Date', value: new Date(event.date).toLocaleString() },
  ]

  return (
    <View className={'flex-1'}>
      <CustomImage uri={event.image} className="mb-3 h-3/4 w-full" />
      <BackButton isFloating />

      <FavoriteButton
        toggleBookmark={() => toggleBookmark(event)}
        event={event}
        size="medium"
        className="right-2 top-14"
      />

      <View className="absolute bottom-0 h-3/6 w-full flex-1 rounded-t-2xl bg-white px-4 pt-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold">{event.title}</Text>
        </View>

        {/* Description */}
        <Text className="mb-1 text-base font-semibold">Description</Text>
        <Text className="text-gray-600">{event.description}</Text>

        {/* Location & Time */}
        <View className="mt-6 space-y-4">
          {infoRows.map((row, index) => (
            <View key={index} className="mb-2 flex-row items-center">
              <View className="mr-3 rounded-full bg-orange-100 p-2">
                <Text>{row.label === 'Location' ? '📍' : '📅'}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-500">{row.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Add to calendar */}
        <AddToCalendarButton event={event} />
      </View>
    </View>
  )
}
