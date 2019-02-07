import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150
  },
  image: {
    height: '100%',
    width: '100%'
  }
})

export default function AppLogo () {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./icons/logo.png')} />
    </View>
  )
}
