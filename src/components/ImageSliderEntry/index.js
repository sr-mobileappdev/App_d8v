import React from 'react'
import {Image, View} from 'react-native'

import styles from './styles'

const ImageSliderEntry = ({data}) => {
  return (
    <View style={styles.sliderInnerContainer} pointerEvents='box-none'>
      <Image
        source={{uri: data.path}}
        style={styles.image}
      />
    </View>
  )
}

export default ImageSliderEntry
