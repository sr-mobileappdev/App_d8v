import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Text from './icons/text.png'

PhotoText.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function PhotoText ({onPress, ...rest}) {
  return (
    <Button onPress={onPress} {...rest} >
      <Image source={Text} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
