import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Accept from './icons/accept.png'

AcceptButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function AcceptButton ({onPress, ...rest}) {
  return (
    <Button onPress={onPress} {...rest} >
      <Image source={Accept} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
