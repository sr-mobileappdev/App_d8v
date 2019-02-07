import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Edit from './icons/edit.png'

PhotoEdit.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function PhotoEdit ({onPress, ...rest}) {
  return (
    <Button onPress={onPress} {...rest} >
      <Image source={Edit} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
