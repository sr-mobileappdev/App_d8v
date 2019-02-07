import React from 'react'
import {StyleSheet} from 'react-native'
import {BlurView} from 'react-native-blur'

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(48, 51, 56, 0.5)'
  }
})

const BlurOverlay = ({blurAmount = 5, blurType = 'light'}) => (
  <BlurView
    style={styles.absolute}
    blurAmount={blurAmount}
    blurRadius={blurAmount}
    blurType={blurType}
  />
)

export default BlurOverlay
