import React, {PureComponent} from 'react'

import styled from 'styled-components'

import BrickFooter from '../BrickFooter'
import {Images} from 'src/theme'

export class BrickItem extends PureComponent {
  constructor(props) {
    super(props)

    this.navigateToItem = this.navigateToItem.bind(this)
  }
  render() {
    const {name, uri, height} = this.props

    // TODO: replace in production
    const source = Images.CarsImage

    return (
      <Container onPress={this.navigateToItem}>
        <ImageContainer
          height={height}
          source={source || {uri}}
          resizeMode='cover'
        />
        <BrickFooter name={name} />
      </Container>
    )
  }

  navigateToItem() {
    this.props.onPress(this.props.businessId)
  }
}

const BORDER_RADIUS = 16

const Container = styled.TouchableOpacity`
  margin: 7px;
`

const ImageContainer = styled.Image`
  width: 100%;
  border-radius: ${BORDER_RADIUS}px;
  height: ${props => props.height || '100px'};
  overflow: hidden;
`

export default BrickItem
