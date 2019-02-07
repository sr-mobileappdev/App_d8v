import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import PropTypes from 'prop-types'

CameraButton.propTypes = {
  onPress: PropTypes.func
}

export function CameraButton ({onPress, style}) {
  return (
    <CameraButtonContainer {...{style}}>
      <TouchableOpacity {...{onPress}}>
        <Image source={require('src/assets/icons/camera.png')} />
      </TouchableOpacity>
    </CameraButtonContainer>
  )
}

// //
const CameraButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;
`
