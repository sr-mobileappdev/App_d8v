import React from 'react'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

const ScreenHeader = ({title}) => (
  <Container>
    <Title>{title}</Title>
  </Container>
)

const Container = styled.View`
  padding: 40px 15px 27px;
`

const Title = styled(StyledText)`
  align-self: center;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.41px;
  color: #303338;
`

export default ScreenHeader
