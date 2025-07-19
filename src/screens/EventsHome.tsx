import React from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import EventCard from '@/components/event/EventCard'
import { RootStackParamList } from '@/types/navigation'
import { useEventsQuery } from '@/api/hooks/useEventsQuery'

export default function EventsHome() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const EventsHorizontalList = () => {
    const { data: events, isLoading, error } = useEventsQuery()

    if (isLoading) {
      return <Text className="mx-5 text-white">Loading...</Text>
    }

    if (error) {
      return <Text className="mx-5 text-white">Error loading events</Text>
    }

    const eventsSliced = events?.slice(0, 3)

    return (
      <FlatList
        data={eventsSliced}
        keyExtractor={(event) => event.id}
        onEndReachedThreshold={0.3}
        showsHorizontalScrollIndicator={false}
        className="w-full flex-1 border-r-2"
        bounces={false}
        horizontal
        ListEmptyComponent={() => <Text className="mx-5 text-red-500">No events found</Text>}
        renderItem={({ item: event }) => (
          <View className={`p-4`}>
            <EventCard event={event} />
          </View>
        )}
      />
    )
  }

  return (
    <React.Fragment>
      <View className="absolute inset-0">
        <View className="h-[50%] bg-black" />
        <View className="flex-1 bg-white" />
      </View>

      <Text className="mx-5 mt-20 text-lg font-normal text-slate-300">Hello</Text>
      <Text className="mx-5 mt-3 text-3xl font-medium text-white">Discover exciting events</Text>

      <View className="mx-5 mb-5 mt-20 flex-row items-center justify-between ">
        <Text className="text-lg text-white">Popular events 🔥</Text>

        <Pressable onPress={() => navigation.navigate('EventsList')} hitSlop={20}>
          <Text className={`text-lg text-primary`}>View all</Text>
        </Pressable>
      </View>

      <EventsHorizontalList />
    </React.Fragment>
  )
}
