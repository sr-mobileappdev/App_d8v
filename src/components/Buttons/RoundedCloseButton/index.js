import React from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'

import styled from 'styled-components'

import Icon from './icons/white-bold-close.png'

export default function CloseButton ({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ButtonContainer>
        <Image source={Icon} />
      </ButtonContainer>
    </TouchableWithoutFeedback>
  )
}

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 28px;
  background-color: rgba(255, 255, 255, 0.25);
`
