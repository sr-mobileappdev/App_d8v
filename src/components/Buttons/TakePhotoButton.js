import React from 'react'
import {TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import {BlurView} from 'react-native-blur'
import PropTypes from 'prop-types'

TakePhotoButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function TakePhotoButton ({onPress}) {
  return (
    <IconCicle {...{onPress}}>
      <Button
        blurType='light'
        blurAmount={2}
      />
    </IconCicle>
  )
}

const Button = styled(BlurView)`
  height: 100%;
  width: 100%;
`

const IconCicle = styled(TouchableOpacity)`
  border: 8px solid #fff;
  width: 64px;
  height: 64px;
  border-radius: 64;
  overflow: hidden;
`
