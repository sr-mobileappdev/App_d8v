/**
 * @format
 * @flow
 */

import React, {PureComponent} from 'react'
import {StyleSheet, Animated, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%'
  },
  darken: {
    backgroundColor: 'rgba(250, 250, 250, 0.5)'
  }
})

export default class ProfileEdit extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      backgroundRef: null,
      blurOpacity: new Animated.Value(0)
    }

    console.log('ProfileEdit Constructor')
  }

  componentDidMount = () => {
    Animated.timing(this.state.blurOpacity,
      {toValue: 1, duration: 500}
    ).start(() => { this.props.onEndEdit() })
  }

  onEndEdit = () => {
    this.props.onEndEdit()

    Animated.timing(this.state.blurOpacity,
      {toValue: 0, duration: 500}
    ).start(() => { this.props.onEndEdit() })
  }

  render() {
    const blurOpacity = this.state.blurOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    const scale = this.state.blurOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
      extrapolate: 'clamp'
    })

    const backgroundImage = this.props.backgroundImage

    return (
      <>
        {/* initial clear image
        <Animated.Image
          source={imageUrl ? {uri: imageUrl} : backgroundImage}
          style={[
            styles.fullScreen,
            {transform: [{scale}, {perspective: 1000}]}
          ]}
        /> */}

        {/* next image with blur and opacity: 1 for the second screen */}
        <TouchableOpacity style={styles.fullScreen} onPress={this.onEndEdit} activeOpacity={0}>
          <Animated.View
            style={[styles.fullScreen, styles.darken, {opacity: blurOpacity}]}
          >
            <Animated.Image
              source={backgroundImage}
              blurRadius={1}
              style={[
                styles.fullScreen,
                {transform: [{scale}, {perspective: 1000}]}
              ]}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity>
          {this.props.children}
        </TouchableOpacity>

        {/* dark mask 0.25
        <Animated.View
          style={[styles.fullScreen, styles.darken, {opacity: blurOpacity}]}
        />

        <LinearGradient
          locations={[0, 0.5]}
          colors={[
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0)'
          ]}
          style={styles.fullScreen}
        />
*/}
      </>
    )
  }
}
