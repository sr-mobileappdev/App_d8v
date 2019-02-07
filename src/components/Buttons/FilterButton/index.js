import React from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'

import Icon from './icons/filter.png'
import WhiteIcon from './icons/white-filter.png'

export default function FilterButton ({onPress, isWhite}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={isWhite ? WhiteIcon : Icon} />
    </TouchableWithoutFeedback>
  )
}
