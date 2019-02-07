import React from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components'

export default function NavBarIcon({icon, onPress, active}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <IconContainer active={active}>
          <Image source={icon} />
        </IconContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled.View`
  padding-horizontal: 20px;
  padding-bottom: 15px;
`

const IconContainer = styled.View`
  padding-top: 15px;
  opacity: ${props => (props.active ? 1.0 : 0.5)};
`
