import React, {Component} from 'react'
import {Image, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    active: PropTypes.bool
  }

  static defaultProps = {
    data: {},
    onPress: () => { },
    active: false
  }

  render () {
    const {data: {title, subtitle, imageUrl}, active} = this.props

    return (
      <SlideContainer
        style={styles.shadow}
        onPress={this.props.onPress}
      >
        <Container
          active={active}
        >
          <ImageContainer style={styles.shadow}>
            <Image style={{overflow: 'hidden', width: 70, height: 85}} source={{uri: imageUrl}} />
          </ImageContainer>
          <TextContainer>
            <TitleText>
              {title}
            </TitleText>
            <SubTitleText>
              {subtitle}
            </SubTitleText>
          </TextContainer>
        </Container>
      </SlideContainer>
    )
  }

  onPress = () => {
    const {onPress, data} = this.props

    onPress(data)
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.5,
    elevation: 10
  }
})

const SlideContainer = styled.View.attrs({
  activeOpacity: 1
})`
  padding-horizontal: 5px;
  padding-vertical: 15px;
`

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-content: center;
  height: 85px;
  background-color: #fff;
  opacity: ${props => props.active ? 1 : 0.9};
`

const TextContainer = styled.View`
  flex: 1;
  padding-horizontal: 12px;
  align-self: center;
`

const TitleText = styled(StyledText)`
  font-size: 18px;
  letter-spacing: -0.21px;
  font-weight: 500;
  color: #000;
`
const SubTitleText = styled(TitleText)`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);
`

const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
