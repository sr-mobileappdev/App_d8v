import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Decline from './icons/cancel.png'

DeclineButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function DeclineButton ({onPress, ...rest}) {
  return (
    <Button onPress={onPress} {...rest} >
      <Image source={Decline} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
