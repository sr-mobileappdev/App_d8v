import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import FlashActive from './icons/flash_active.png'
import FlasAuto from './icons/flash_auto.png'

FlashButton.defaultProps = {
  active: false
}

FlashButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool
}

export function FlashButton ({onPress, active}) {
  return (
    <Button onPress={onPress}>
      {
        active
          ? <Image source={FlashActive} />
          : <Image source={FlasAuto} />

      }
    </Button>
  )
}

const Button = styled(TouchableOpacity)``
