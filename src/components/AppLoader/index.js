import React, {Component} from 'react'
import {Animated, Dimensions} from 'react-native'
import styled from 'styled-components'

export class AppLoader extends Component {
  state = {
    loadingProgress: new Animated.Value(0),
    isSolidLoaded: false,
    isTransparentLoaded: false,
    isAnimationDone: false
  }

  componentDidUpdate(propsOld, stateOld) {
    const {isSolidLoaded, isTransparentLoaded, loadingProgress} = this.state

    const {
      isSolidLoaded: isSolidLoadedOld,
      isTransparentLoaded: isTransparentLoadedOld
    } = stateOld

    const hasUpdates =
      isSolidLoaded !== isSolidLoadedOld ||
      isTransparentLoaded !== isTransparentLoadedOld ||
      propsOld.isLoaded !== this.props.isLoaded
    const imagesDidLoad = isSolidLoaded && isTransparentLoaded

    if (!hasUpdates) {
      return
    }

    if (imagesDidLoad && this.props.isLoaded) {
      Animated.timing(loadingProgress, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true
      }).start(this.finishAnimation)
    }
  }

  render() {
    const {loadingProgress, isSolidLoaded, isTransparentLoaded} = this.state
    const {isLoaded, children} = this.props

    const imageTransform = [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 10, 100],
          outputRange: [1, 0.8, 70]
        })
      }
    ]

    const imageOpacity = loadingProgress.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })

    const offset = {
      x: -IMG_SIZE / 2 + window.width / 2,
      y: -IMG_SIZE / 2 + window.height / 2
    }

    const solidStyle = {
      top: offset.y,
      left: offset.x,
      transform: imageTransform,
      opacity: imageOpacity
    }

    const transparentStyle = {
      top: offset.y,
      left: offset.x,
      transform: imageTransform
    }

    const animationStyle = {
      flex: 1,
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [1.1, 1]
          })
        }
      ]
    }

    const imagesDidLoad = isSolidLoaded && isTransparentLoaded
    const appIsLoaded = isLoaded && imagesDidLoad

    return (
      <AppLoaderContainer>
        <Animated.View style={animationStyle}>
          {appIsLoaded && children}
        </Animated.View>

        {this.renderTransparentIcon({style: transparentStyle})}
        {this.renderSolidIcon({style: solidStyle})}
      </AppLoaderContainer>
    )
  }

  finishAnimation = () => this.setState({isAnimationDone: true})

  onTransparentLoad = () => this.setState({isTransparentLoaded: true})

  onSolidLoad = () => this.setState({isSolidLoaded: true})

  renderTransparentIcon = ({style}) => {
    if (this.state.isAnimationDone) {
      return null
    }

    return (
      <Animated.Image
        source={transparentIcon}
        style={[
          {
            position: 'absolute',
            height: IMG_SIZE,
            width: IMG_SIZE
          },
          style
        ]}
        onLoad={this.onTransparentLoad}
        onError={this.onTransparentLoad}
        fadeDuration={0}
      />
    )
  }

  renderSolidIcon = ({style}) => {
    if (this.state.isAnimationDone) {
      return null
    }

    return (
      <Animated.Image
        source={solidIcon}
        style={[
          {
            position: 'absolute',
            height: IMG_SIZE,
            width: IMG_SIZE
          },
          style
        ]}
        onLoad={this.onSolidLoad}
        onError={this.onSolidLoad}
        fadeDuration={0}
      />
    )
  }
}

// //
const IMG_SIZE = 3500
const transparentIcon = require('./img/transparent.png')
const solidIcon = require('./img/solid.png')
const window = Dimensions.get('window')

const AppLoaderContainer = styled.View`
  flex: 1;
`
