import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// Importing vector icons
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { colors } from 'styles/colors'
import EventsHome from '@/screens/EventsHome'
import EventBookmarks from '@/screens/EventBookmarks'
import { shadows } from 'styles/shadows'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  const getIconColor = (focused: boolean) => (focused ? colors.primary : colors.black)

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingTop: 10, ...shadows.card },
        animation: 'fade',
      }}>
      <Tab.Screen
        name="Home"
        component={EventsHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={getIconColor(focused)} />
          ),

          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Bookmarks"
        component={EventBookmarks}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="bookmark" size={24} color={getIconColor(focused)} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  )
}
