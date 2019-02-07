import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Volume from './icons/volume.png'

PhotoVolume.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function PhotoVolume ({onPress, ...rest}) {
  return (
    <Button onPress={onPress} {...rest} >
      <Image source={Volume} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
