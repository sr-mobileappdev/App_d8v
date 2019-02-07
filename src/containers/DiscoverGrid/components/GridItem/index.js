import React, {Component} from 'react'
import {Dimensions, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components'

import ImagePlaceholder from '../ImagePlaceholder'

export default class GridItem extends Component {
  onPress = () => {
    const {onPress, id} = this.props

    onPress(id)
  }

  renderImage = () => {
    const {cover_photo_url: uri} = this.props

    if (uri) {
      return (
        <TouchableWithoutFeedback onPress={this.onPress}>
          <ImageBackgroundContainer source={{uri}} />
        </TouchableWithoutFeedback>)
    }

    return (<ImagePlaceholder onPress={this.onPress} />)
  }

  render () {
    return (
      <Container>
        {this.renderImage()}
      </Container>
    )
  }
}

const {width} = Dimensions.get('window')
const CONTAINER_PADDING = 15

const size = (width - CONTAINER_PADDING) / 3

const Container = styled.View`
  height: ${size};
  width: ${size};
  padding: 7.5px;
`

const ImageBackgroundContainer = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
`
