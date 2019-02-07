import React, {PureComponent} from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components'

import Icon from './icons/image-placeholder.png'

export default class ImagePlaceholder extends PureComponent {
  render () {
    const {onPress} = this.props

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Container>
          <Image source={Icon} />
        </Container>
      </TouchableWithoutFeedback>
    )
  }
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(48, 51, 56, 0.5);
  justify-content: center;
  align-items: center;
`
