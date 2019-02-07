import React from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'

import AnnotationIcon from './icons/annotation.png'
import PinIcon from './icons/pin.png'
import PinHomeIcon from './icons/pin-home.png'

import LocationMarker from './icons/location-marker.png'

const markers = {
  0: AnnotationIcon,
  1: PinIcon,
  2: PinHomeIcon
}

export default function Annotation ({type = 0, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={markers[type]} resizeMode='center' />
    </TouchableWithoutFeedback>
  )
}

export function UserLocationAnnotation () {
  return (
    <TouchableWithoutFeedback>
      <Image source={LocationMarker} resizeMode='center' />
    </TouchableWithoutFeedback>
  )
}
