import React from 'react'
import {Image} from 'react-native'
import styled from 'styled-components'

import Icon from './icons/discover.png'

export default function DiscoverIcon () {
  return (
    <Container>
      <Image source={Icon} />
    </Container>
  )
}

const Container = styled.View`
  margin-right: 10px;
`
