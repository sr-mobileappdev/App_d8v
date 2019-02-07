import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Stickers from './icons/stickers.png'

PhotoStickers.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function PhotoStickers ({onPress, ...rest}) {
  return (
    <Button onPress={onPress} {...rest} >
      <Image source={Stickers} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
