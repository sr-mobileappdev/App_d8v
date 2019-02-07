/**
 * @format
 * @flow
 */

import React, {PureComponent} from 'react'
import {StyleSheet, Animated} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {Metrics} from 'src/theme'
const BG_INITIAL_SCALE = 1.2
const BG_NEXT_SCALE = 1

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%'
  },
  darken: {
    backgroundColor: 'rgba(0,0,0,0.25)'
  }
})

export default class AnimatedBackground extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      backgroundRef: null
    }
  }

  componentDidMount = () => {
  }
	
  render() {
    const {offsetX, imageUrl, backgroundImage} = this.props

    const scale = offsetX.interpolate({
      inputRange: [0, Metrics.screenWidth],
      outputRange: [BG_INITIAL_SCALE, BG_NEXT_SCALE],
      extrapolate: 'clamp'
    })

    const blurOpacity = offsetX.interpolate({
      inputRange: [0, Metrics.screenWidth],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    return (
      <>
        {/* initial clear image */}
        <Animated.Image
          source={imageUrl ? {uri: imageUrl} : backgroundImage}
          style={[
            styles.fullScreen,
            {transform: [{scale}, {perspective: 1000}]}
          ]}
        />

        {/* next image with blur and opacity: 1 for the second screen */}
        <Animated.View
          style={[styles.fullScreen, styles.darken, {opacity: blurOpacity}]}
        >
          <Animated.Image
            source={imageUrl ? {uri: imageUrl} : backgroundImage}
            blurRadius={1}
            style={[
              styles.fullScreen,
              {transform: [{scale}, {perspective: 1000}]}
            ]}
          />
        </Animated.View>

        {/* dark mask 0.25 */}
        <Animated.View
          style={[styles.fullScreen, styles.darken, {opacity: blurOpacity}]}
        />

        {/* linear gradient to make it  darker  */}
        <LinearGradient
          locations={[0, 0.5]}
          colors={[
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0)'
          ]}
          style={styles.fullScreen}
        />
      </>
    )
  }
}
