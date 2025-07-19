import { Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigator from './TabNavigator'
import EventDetails from '@/screens/EventDetails'
import EventsList from '@/components/event/EventsList'
import { RootStackParamList } from '@/types/navigation'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="EventsHome" component={TabNavigator} />
      <RootStack.Screen name="EventsList" component={EventsList} />

      <RootStack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{
          animation: Platform.OS === 'android' ? 'default' : 'fade_from_bottom',
        }}
      />
    </RootStack.Navigator>
  )
}
