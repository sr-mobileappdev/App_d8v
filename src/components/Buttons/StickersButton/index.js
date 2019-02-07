import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Stickers from './icons/camera_stickers.png'

StickersButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function StickersButton ({onPress}) {
  return (
    <Button onPress={onPress}>
      <Image source={Stickers} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
