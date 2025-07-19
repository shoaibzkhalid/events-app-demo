import { Alert, Linking, Platform } from 'react-native'
import * as Calendar from 'expo-calendar'

import { Event } from '@/types/event'
import CustomButton from '@/components/CustomButton'

type Props = {
  event: Event
}

const EVENT_DURATION_MS = 2 * 60 * 60 * 1000 // 2 hours

export default function AddToCalendarButton({ event }: Props) {
  const checkPermission = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync()
      return status === 'granted'
    } catch (error) {
      console.error('Error checking calendar permissions:', error)
      return false
    }
  }

  const getWritableCalendar = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
      return calendars.find((cal) => cal.allowsModifications) || calendars[0]
    } catch (error) {
      console.error('Error fetching calendars:', error)
      return null
    }
  }

  const isEventAlreadyAdded = async (calendarId: string, start: Date, end: Date, title: string) => {
    try {
      const events = await Calendar.getEventsAsync([calendarId], start, end)
      return events.some(
        (ev) => ev.title === title && new Date(ev.startDate).getTime() === start.getTime()
      )
    } catch (error) {
      console.error('Error checking if event already exists:', error)
      return false
    }
  }

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else {
      Linking.openSettings()
    }
  }

  const addEvent = async () => {
    try {
      const granted = await checkPermission()

      if (!granted) {
        return Alert.alert(
          'Permission Denied',
          'Calendar access is needed to add this event. Open settings?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openAppSettings },
          ]
        )
      }

      const calendar = await getWritableCalendar()
      if (!calendar) return Alert.alert('No writable calendar found')

      const start = new Date(event.date)
      const end = new Date(start.getTime() + EVENT_DURATION_MS)

      const alreadyExists = await isEventAlreadyAdded(calendar.id, start, end, event.title)

      if (alreadyExists) {
        return Alert.alert('Already added', 'This event is already on your calendar')
      }

      await Calendar.createEventAsync(calendar.id, {
        title: event.title,
        startDate: start,
        endDate: end,
        location: event.location,
        timeZone: event.timeZone,
      })

      Alert.alert('Added to Calendar', `Event: ${event.title}`)
    } catch (error) {
      console.error('Error occurred in addEvent:', error)
      Alert.alert('Error', 'Could not add the event to your calendar')
    }
  }

  return <CustomButton onPress={addEvent} title="Add to calendar" />
}
