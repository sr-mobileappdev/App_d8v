import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Animated, Easing} from 'react-native'

import CircularProgress from './CircularProgress'

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress)

export default class AnimatedCircularProgress extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      fillAnimation: new Animated.Value(props.prefill)
    }
  }

  componentDidMount () {
    this.animate()
  }

  componentDidUpdate (oldProps) {
    if (oldProps.fill === this.props.fill) {
      return
    }

    if (this.props.pause) {
      // TODO:  Do not use setState in componentDidUpdate
      return this.setState({ // eslint-disable-line react/no-did-update-set-state
        fillAnimation: new Animated.Value(oldProps.prefill)
      })
    }

    this.animate()
  }

  render () {
    const {fill, prefill, ...other} = this.props

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.fillAnimation}
      />
    )
  }

  animate (toVal, dur, ease) {
    const toValue = toVal || this.props.fill
    const duration = dur || this.props.duration
    const easing = ease || this.props.easing

    return Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration
    }).start(this.props.onAnimationComplete)
  }
}

AnimatedCircularProgress.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func
}

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0
}
