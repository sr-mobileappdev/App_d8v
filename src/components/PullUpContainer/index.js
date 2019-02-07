import React, {Component} from 'react'
import {
  PanResponder,
  Dimensions,
  View,
  StyleSheet,
  Animated
} from 'react-native'
import {isIphoneX} from '../../utils/isIphoneX'
import LinearGradient from 'react-native-linear-gradient'

export default class PullUpContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      topHeight: new Animated.Value(0), // min height for top pane header
      bottomHeight: new Animated.Value(0), // min height for bottom pane header,
      deviceHeight: Dimensions.get('window').height,
      isDividerClicked: false,
      pan: new Animated.ValueXY(),
      expanded: false
    }
    this.viewRef = React.createRef()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the Y position offset when touch start
      onPanResponderGrant: (e, gestureState) => {
        this.setState({
          offset: e.nativeEvent.pageY,
		  startY: -1,
          isDividerClicked: true
        })
      },

      // When we drag the divider, set the bottomHeight (component state) again.
            onPanResponderMove: (e, gestureState) => {
        const {startY, bottomHeight} = this.state
        let position = gestureState.moveY > startY ? this.state.deviceHeight - SWIPE_HEIGHT - (gestureState.moveY - startY) : startY - gestureState.moveY
        if (startY === -1) {
          position = gestureState.moveY <= this.state.deviceHeight / 2 ? this.state.deviceHeight - SWIPE_HEIGHT : 0
          if (bottomHeight._value <= gestureState.dy) {
            position = 0
          }
          if (bottomHeight._value - gestureState.dy >= this.state.deviceHeight - SWIPE_HEIGHT) {
            position = this.state.deviceHeight - SWIPE_HEIGHT
          }
          this.setState({
            bottomHeight: new Animated.Value(position),
            offset: e.nativeEvent.pageY,
            startY: gestureState.moveY
          })
        } else {
          if (bottomHeight._value <= gestureState.dy) {
            position = 0
          }
          if (bottomHeight._value - gestureState.dy >= this.state.deviceHeight - SWIPE_HEIGHT) {
            position = this.state.deviceHeight - SWIPE_HEIGHT
          }
          this.setState({
            bottomHeight: new Animated.Value(position),
            offset: e.nativeEvent.pageY
          })
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        // Do something here for the touch end event
        this.setState({
          offset: e.nativeEvent.pageY,
          isDividerClicked: false
        })
        if (this.state.deviceHeight / 2 < e.nativeEvent.pageY) {
          this.onCollapsed()
        } else {
          this.onExpanded()
        }
      }
    })
  }

  onCollapsed = () => {
    this.setState({
      expanded: false
    })
    Animated.timing(
      // Animate value over time
      this.state.bottomHeight, // The value to drive
      {
        toValue: 0 // Animate to final value of 1
      }
    ).start()
  }

  onExpanded = () => {
    this.setState({
      expanded: true
    })
    Animated.timing(
      // Animate value over time
      this.state.bottomHeight, // The value to drive
      {
        toValue: this.state.deviceHeight // Animate to final value of 1
      }
    ).start()
  }

  render() {
    const {itemCollapsed, itemExpanded} = this.props
    const {expanded} = this.state
    return (
      <View ref={this.viewRef} style={styles.content} pointerEvents='box-none'>
        <Animated.View
          pointerEvents='box-none'
          style={[{backgroundColor: 'transparent', minHeight: 0, flex: 1}, {height: this.state.topHeight}]}
        />
        <View
          {...this._panResponder.panHandlers}
		  pointerEvents='box-only'
        >
          <LinearGradient colors={['#F4F4F4', '#E7E7E7', '#BABAB8']} style={styles.linearGradient} >
            <View style={{height: SWIPE_HEIGHT, justifyContent: `${expanded ? 'flex-end' : 'flex-start'}`}} pointerEvents='none'>
              {itemCollapsed}
            </View>
          </LinearGradient>
        </View>
        <Animated.View
          style={{height: this.state.bottomHeight}}
        >
          {itemExpanded}
        </Animated.View>
      </View>
    )
  }
}
const SWIPE_HEIGHT = isIphoneX() ? 74 : 54
const styles = StyleSheet.create({
  content: {
    top: 0,
    width: `100%`,
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 3
  }
})
