import React from 'react'
import { View } from 'react-native'

import { Image } from 'expo-image'

type ImageProps = {
  uri: string
  alt?: string
  className?: string
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function CustomImage({ uri, className }: ImageProps) {
  return (
    <React.Fragment>
      <View className={className}>
        <Image
          source={{ uri }}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </View>
    </React.Fragment>
  )
}
