import { View, Text, Pressable } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { Event } from '@/types/event'
import { formatDate } from '@/utils/datetime'
import CustomImage from '@/components/CustomImage'
import { RootStackParamList } from '@/types/navigation'
import FavoriteButton from '@/components/FavoriteButton'
import { useEventStore } from '@/stores/event.store'

import { shadows } from 'styles/shadows'

type EventCardProps = {
  event: Event
  size?: 'small' | 'medium'
}

export default function EventCard({ event, size = 'small' }: EventCardProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const toggleBookmark = useEventStore((store) => store.toggleBookmark)

  const widthClass = size === 'small' ? 'w-84' : 'w-full'
  const imgWidthClass = size === 'small' ? 'w-72' : 'w-84'

  return (
    <Pressable
      onPress={() => navigation.navigate('EventDetails', { event })}
      className={`rounded-2xl bg-white p-4 shadow-md ${widthClass}`}
      style={shadows.card}>
      <CustomImage uri={event.image} className={`mb-3 h-48 ${imgWidthClass} rounded-xl`} />
      <FavoriteButton
        toggleBookmark={() => toggleBookmark(event)}
        event={event}
        className="right-6 top-6"
      />

      <Text className="mb-2 text-lg font-semibold text-gray-800">{event.title}</Text>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-sm text-gray-500">{event.location}</Text>
        <Text className="text-sm text-gray-500">{formatDate(event.date)}</Text>
      </View>
    </Pressable>
  )
}
