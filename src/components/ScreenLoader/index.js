import React from 'react'
import {View} from 'react-native'
import {Bars} from 'react-native-loader'

export default function ScreenLoader () {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Bars size={20} color='#00B6EA' />
    </View>
  )
}
