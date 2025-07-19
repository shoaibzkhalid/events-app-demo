import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, FlatList, RefreshControl } from 'react-native'

import EventCard from './EventCard'
import { Event } from '@/types/event'
import BackButton from '@/components/BackButton'
import { useEventsQuery } from '@/api/hooks/useEventsQuery'

type EventListProps = {
  title?: string
  events?: Event[]
}

export default function EventsList({ title = 'All events 🔥', events }: EventListProps) {
  const { data, isLoading, error, refetch } = useEventsQuery()

  if (isLoading) {
    return <Text className="mx-5 text-white">Loading...</Text>
  }

  if (error) {
    return <Text className="mx-5 text-white">Error loading events</Text>
  }

  const eventsList = events || data || []

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-black">
      <FlatList
        data={eventsList}
        keyExtractor={(event) => event.id}
        ListEmptyComponent={() => (
          <React.Fragment>
            <Text className="my-5 text-center text-9xl text-white">📭</Text>
            <Text className="text-center text-lg text-white">No events found</Text>
          </React.Fragment>
        )}
        refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="mx-5 flex-row items-center">
            <BackButton />
            <View className="mx-5 flex-1 py-5">
              <Text className="text-3xl font-medium text-white">{title}</Text>
            </View>
          </View>
        )}
        renderItem={({ item: event }) => {
          return (
            <View className={`flex-row items-center justify-between p-4`}>
              <EventCard event={event} size={'medium'} />
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
