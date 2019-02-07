import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import RetakeIamge from './icons/camera_retake.png'

CameraRetakeButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function CameraRetakeButton ({onPress}) {
  return (
    <Button onPress={onPress} >
      <Image source={RetakeIamge} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
