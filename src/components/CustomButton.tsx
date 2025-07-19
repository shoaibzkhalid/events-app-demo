import { Text, Pressable } from 'react-native'
import { shadows } from '@/styles/shadows'

type CustomButtonProps = {
  onPress: () => void
  title: string
  className?: string
}

export default function CustomButton({ onPress, title, className }: CustomButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`mt-4 w-6/12 items-center self-center rounded-full bg-black py-5 shadow-xl ${className}`}
      style={shadows.card}>
      <Text className="font-semibold text-white">{title}</Text>
    </Pressable>
  )
}
