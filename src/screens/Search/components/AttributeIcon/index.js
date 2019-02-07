import React from 'react'

import { Image } from 'react-native'
import styled from 'styled-components'

export default function AttributeIcon ({ icon }) {
  return (
    <Container>
      <Image source={icon} />
    </Container>
  )
}

const Container = styled.View`
  margin-right: 10px;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: #00B6EA;
`
