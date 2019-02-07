import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import {ScrollIntoViewWrapper} from 'react-native-scroll-into-view'
import {Dimensions, findNodeHandle} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {BlurView} from 'react-native-blur'

import {ProfileCard} from 'src/components/Profile/ui/ProfileCard'
import StyledText from 'src/components/StyledText'

export class ParallaxPictureHeader extends React.PureComponent {
  static propTypes = {
    foregroundContent: PropTypes.func,
    getParallaxViewRef: PropTypes.func,
    backgroundImageProps: PropTypes.object
  }
  static defaultProps = {
    backgroundImageProps: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      blurRadius: 0,
      backgroundImageRef: null
    }
    this._backgroundImageRef = null
  }

  render() {
    const {
      paddingHorizontal,
      paddingVertical,
      backgroundImageProps,
      foregroundText,
      stickyHeaderText,
      foregroundContent,
      getParallaxViewRef,
      ...rest
    } = this.props

    return (
      <CustomParallaxView
        headerBackgroundColor='transparent'
        backgroundColor='transparent'
        contentBackgroundColor='transparent'
        fadeOutForeground
        renderBackground={this.renderBackground}
        renderStickyHeader={this.renderStickyHeader}
        renderForeground={this.renderForeground}
        scrollEvent={this.onScrollEvent}
        ref={getParallaxViewRef}
        {...rest}
      />
    )
  }

  onBackgroundImageLoaded = () => {
    this.setState({
      backgroundImageRef: findNodeHandle(this._backgroundImageRef)
    })
  }

  renderBackground = () => {
    const {
      backgroundImageProps,
      paddingHorizontal,
      paddingVertical
    } = this.props
    const {backgroundImageRef, blurRadius} = this.state
    const hasBlur = backgroundImageRef && blurRadius > 0

    return (
      <BackgroundContainer {...{paddingHorizontal, paddingVertical}}>
        <BackgroundImage
          ref={ref => (this._backgroundImageRef = ref)}
          resizeMode='cover'
          onLoadEnd={this.onBackgroundImageLoaded}
          {...backgroundImageProps}
        />

        {hasBlur && (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            viewRef={backgroundImageRef}
            blurAmount={blurRadius}
            blurType='light'
          />
        )}
      </BackgroundContainer>
    )
  }

  renderStickyHeader = () => {
    const {stickyHeaderText} = this.props

    return (
      <StickyHeaderContainer>
        <StickyHeaderText>{stickyHeaderText}</StickyHeaderText>
      </StickyHeaderContainer>
    )
  }

  renderForeground = () => {
    const {
      foregroundText,
      foregroundContent = () => (
        <ForegroundText>{foregroundText}</ForegroundText>
      )
    } = this.props

    return <ForegroundContainer>{foregroundContent()}</ForegroundContainer>
  }

  onScrollEvent = event => {
    const yOffset = event.nativeEvent.contentOffset.y

    if (yOffset === 0) {
      return
    }

    const divisor = yOffset < 0 ? 50 : window.height
    const radius = Math.min(1, Math.abs(yOffset / divisor))

    this.setState({blurRadius: Math.floor(radius * 25)})
  }
}

/// /
const window = Dimensions.get('window')

const CustomParallaxView = styled(
  ScrollIntoViewWrapper({
    animated: true,
    immediate: false,
    insets: {
      top: 0,
      bottom: 0
    }
  })(ParallaxScrollView)
)`
  flex: 1;
  overflow: hidden;
`

const BackgroundContainer = styled.View`
  width: ${props => window.width - props.paddingHorizontal}px;
  height: ${props => window.height - props.paddingVertical}px;
`
const BackgroundImage = styled.Image`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const ForegroundContainer = styled(LinearGradient).attrs({
  colors: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)'],
  locations: [0.2, 1]
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 20px 10px;
  justify-content: flex-end;
`
const ForegroundText = styled(StyledText).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail'
})`
  color: #2b3032;
  font-weight: bold;
  font-size: 48px;
`

const StickyHeaderContainer = styled(ProfileCard)`
  margin-top: 0;
`
const StickyHeaderText = styled(ForegroundText).attrs({numberOfLines: 1})`
  font-size: 24px;
  color: #2a464e;
  text-align: center;
  font-weight: bold;
`
