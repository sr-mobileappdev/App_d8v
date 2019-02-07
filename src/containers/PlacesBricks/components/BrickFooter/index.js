import React, {PureComponent} from 'react'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

const colorThemes = ['light', 'dark']

export class BrickFooter extends PureComponent {
  getColorTheme = () => {
    const random = Math.round(Math.random())

    return colorThemes[random]
  }

  render () {
    const {name} = this.props
    const colorTheme = this.getColorTheme()

    return (
      <Container>
        <Title colorTheme={colorTheme}>{name}</Title>
      </Container>
    )
  }
}

const Container = styled.View`
  width: 100%;
  padding: 13px 15px 15px;
  border-radius: 16px;
  overflow: hidden;
`

const Title = styled(StyledText).attrs({numberOfLines: 2})`
  font-size: 15px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.12px;
  color: #303338;
`

export default BrickFooter
