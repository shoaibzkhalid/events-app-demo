import { Alert, Pressable } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

import { Event } from '@/types/event'
import { Ionicons } from '@expo/vector-icons'
import { useEventStore } from '@/stores/event.store'

type FavoriteButtonProps = {
  toggleBookmark: (id: string) => void
  event: Event
  className?: string
  size?: 'small' | 'medium'
}

export default function FavoriteButton({
  toggleBookmark,
  event,
  className,
  size = 'small',
}: FavoriteButtonProps) {
  const scale = useSharedValue(1)
  const padding = size === 'small' ? 2 : 4
  const iconSize = size === 'small' ? 20 : 16

  const isBookmarked = useEventStore((store) =>
    store.bookmarkedEvents.some((e) => e.id === event.id && e.isBookmarked)
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const onPress = () => {
    toggleBookmark(event.id)

    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1)
    })

    Alert.alert(isBookmarked ? `Event removed from bookmarks` : `Event added to bookmarks`)
  }

  return (
    <Pressable
      onPress={onPress}
      className={`absolute z-10 rounded-full bg-white p-${padding} ${className}`}
      //
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={isBookmarked ? 'heart' : 'heart-outline'}
          size={iconSize}
          color={isBookmarked ? 'red' : '#9ca3af'}
        />
      </Animated.View>
    </Pressable>
  )
}
