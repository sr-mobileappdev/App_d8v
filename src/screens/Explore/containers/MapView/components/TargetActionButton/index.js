import React from 'react'
import {Image} from 'react-native'
import styled from 'styled-components'

import Icon from './icons/target.png'

export default function TargetActionButton ({onPress}) {
  return (
    <Container onPress={onPress} style={{shadowOffset: {height: 10}}}>
      <Image source={Icon} />
    </Container>
  )
}

const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 32px;
  height: 32px;
  position: absolute;
  bottom: 190px;
  right: 15px;
  align-self: flex-end;
  background-color: #FFF;
  border-radius: 16px;
  padding: 8px;
  shadowColor: rgba(22, 24, 35, 0.2);
  shadowRadius: 20; 
  shadowOpacity: 1.0;
`
