import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import StyledText from '../../../StyledText'

export default class SectionTitle extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    textRight: PropTypes.string
  }
  static defaultProps = {}

  render () {
    const {icon, text, textRight} = this.props

    return (
      <Container>
        <TextLeftContainer>
          {!!icon && <Icon source={icon} />}
          <Title>{text}</Title>
        </TextLeftContainer>

        {textRight && <TitleYellow>{textRight}</TitleYellow>}
      </Container>
    )
  }
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 9px 10px;
  background-color: rgba(22, 24, 35, 0.75);
  border-radius: 13px;
  margin-bottom: 10px;
`

const TextLeftContainer = styled.View`
  flex-direction: row;
`

const Icon = styled.Image`
  align-self: center;
  margin-right: 3px;
`

const Title = styled(StyledText)`
  align-self: center;
  padding: 0 10px;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: -0.15px;
  color: #fff;
`

const TitleYellow = styled(Title)`
  color: #F0B218;
  padding: 0;
`
