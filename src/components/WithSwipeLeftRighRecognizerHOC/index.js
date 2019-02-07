import React, {Component} from 'react'
import {PanResponder} from 'react-native'

export const swipeDirections = {
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT'
}
const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
}

function isValidSwipe (velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
  return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold
}

export default function withHorizontalSwipeRecognizer (WrappedComponent) {
  class ComponentWithHorizontalSwiperRecognizer extends Component {
    constructor (props) {
      super(props)

      this.componentRef = React.createRef()
    }

    componentWillMount () {
      this._panResponder = PanResponder.create({ // stop JS beautify collapse
        onStartShouldSetPanResponder: this.shouldSetResponder,
        onMoveShouldSetPanResponder: this.shouldSetResponder,
        onPanResponderRelease: this.handlePanResponderEnd,
        onPanResponderTerminate: this.handlePanResponderEnd
      })
    }

    render () {
      return (
        <WrappedComponent
          ref={this.componentRef}
          {...this._panResponder.panHandlers}
          {...this.props}
        />
      )
    }

    shouldSetResponder = ({nativeEvent}, gestureState) => {
      return nativeEvent.touches.length === 1 && !this.gestureIsClick(gestureState)
    }

    gestureIsClick = ({dx, dy}) => {
      return Math.abs(dx) < 5 && Math.abs(dy) < 5
    }

    handlePanResponderEnd = (evt, gestureState) => {
      const swipeDirection = this.getSwipeDirection(gestureState)
      this.triggerSwipeHandlers(swipeDirection, gestureState)
    }

    getSwipeDirection = (gestureState) => {
      const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections
      const {dx} = gestureState
      if (this.isValidHorizontalSwipe(gestureState)) {
        return (dx > 0)
          ? SWIPE_RIGHT
          : SWIPE_LEFT
      }
      return null
    }

    isValidHorizontalSwipe (gestureState) {
      const {vx, dy} = gestureState
      const {velocityThreshold, directionalOffsetThreshold} = swipeConfig
      return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold)
    }

    triggerSwipeHandlers (swipeDirection, gestureState) {
      const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections
      const {onSwipeLeft, onSwipeRight} = this.props

      switch (swipeDirection) {
        case SWIPE_LEFT:
          onSwipeLeft && onSwipeLeft(gestureState)
          break
        case SWIPE_RIGHT:
          onSwipeRight && onSwipeRight(gestureState)
          break
      }
    }
  }

  ComponentWithHorizontalSwiperRecognizer.displayName = `withHorizontalSwipeRecognizer(${WrappedComponent.displayName || WrappedComponent.name})`

  ComponentWithHorizontalSwiperRecognizer.navigationOptions = WrappedComponent.navigationOptions

  return ComponentWithHorizontalSwiperRecognizer
}
