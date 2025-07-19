import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'

type BackButtonProps = {
  className?: string
  isFloating?: boolean
}

export default function BackButton({ isFloating = false }: BackButtonProps) {
  const navigation = useNavigation()
  const positionClass = isFloating ? 'absolute left-4 top-14 bg-orange-300' : `bg-transparent`
  const iconSize = isFloating ? 16 : 22

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      className={`${positionClass} overflow-hidden rounded-full p-4 opacity-90`}>
      <Ionicons name="arrow-back" size={iconSize} color={'white'} />
    </Pressable>
  )
}
