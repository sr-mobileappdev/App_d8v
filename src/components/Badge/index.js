import React from 'react'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

export default function Badge ({style, icon, text, color = '#00B6EA', size, small}) {
  return (
    <Container style={style} color={color} size={size} small={small}>
      { !!icon && <BadgeIcon source={icon} />}
      <BadgeText>{text}</BadgeText>
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  align-content: center;
  align-self: flex-start;
  margin-right: 10px;
  background-color: ${props => props.color};
  border-radius: 22px;
  padding: 0 10px;
  
  ${({size}) => size && `
    height: ${size}px;
  `}
  
  ${({small}) => small && `
    padding: 5px 10px;
    border-radius: 13px;
  `}
`

const BadgeIcon = styled.Image`
  align-self: center;
  margin-right: 3px;
`

const BadgeText = styled(StyledText)`
  align-self: center;
  padding: 0 4px;
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;
  color: #fff;
`
