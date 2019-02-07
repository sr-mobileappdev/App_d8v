import React from 'react'
import {TouchableWithoutFeedback, Image} from 'react-native'

import Icon from './icons/close.png'

export default function CloseButton ({onPress, style}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={style}>
      <Image source={Icon} />
    </TouchableWithoutFeedback>
  )
}
