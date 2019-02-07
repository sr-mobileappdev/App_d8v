/* eslint-disable camelcase */
import React from 'react'
import {ImageBackground} from 'react-native'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

const GalleryItem = (props) => {
  const {data: {src, description}} = props

  return (
    <Container source={{uri: src}}>
      <CardText>{description}</CardText>
    </Container>
  )
}

export default GalleryItem

const Container = styled(ImageBackground)`
  width: 200px;
  height: 150px;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 15px;
  background-color: #FFF;
`

const CardText = styled(StyledText).attrs({numberOfLines: 2})`
  color: #FFFFFF;
  font-size: 17px;
  letter-spacing: -0.15px;
  font-weight: 700;
  bottom: 11px;
  left: 15px;
  right: 15px;
  position: absolute;
`
