import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {TouchableOpacity, Image} from 'react-native'

import Bitmap from './icons/placeholder.png'

GalleryPreviewButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

export function GalleryPreviewButton ({onPress}) {
  return (
    <Button onPress={onPress}>
      {/* TODO: change for dynamic image */}
      <Image source={Bitmap} />
    </Button>
  )
}

const Button = styled(TouchableOpacity)`
  border-radius: 6px;
  overflow: hidden;
`
