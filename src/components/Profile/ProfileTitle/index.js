import React, {PureComponent} from 'react'
import {Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

export default class ProfileTitle extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired
  }
  static defaultProps = {}

  state = {
    titleHeight: 0
  }

  render () {
    const {title, offset} = this.props
    const {titleHeight} = this.state

    return (
      <TitleContainer onLayout={this.onTitleLayout} titleHeight={titleHeight} offset={offset}>
        <Title>{title}</Title>
      </TitleContainer>
    )
  }

  onTitleLayout = ({nativeEvent: {layout: {height}}}) => {
    this.setState({titleHeight: height})
  }
}

const {height} = Dimensions.get('window')

const TitleContainer = styled.View`
  padding-horizontal: 15px;
  opacity: ${props => props.titleHeight ? 1 : 0};
  margin-top: ${props => height - props.offset - props.titleHeight}px;
`

const Title = styled(StyledText).attrs({numberOfLines: 3})`
  font-weight: 700;
  color: #FFF;
  fontSize: 34px;
  letter-spacing: -0.3px;
  margin-bottom: 15px;
`
