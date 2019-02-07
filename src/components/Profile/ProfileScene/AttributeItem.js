
import React from 'react'
import {View, Text, StyleSheet, Dimensions, PanResponder} from 'react-native'
import Tooltip from '../Tooltip/Tooltip'
import Icon from 'react-native-vector-icons/FontAwesome'

const screenWidth = Dimensions.get('window').width
const attrIconSize = (screenWidth - 40) / 3 / 4

export default class AttributeItem extends React.Component {
  constructor(props) {
    super(props)

    this.tooltipRef = React.createRef()

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        this.showTooltip()

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.hideTooltip()
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.hideTooltip()
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true
      }
    })

    console.log('AttributeItem Constructor')
  }

  showTooltip = () => {
    this.tooltipRef.toggleTooltip()
    this.props.toggleTooltip()
  }

  hideTooltip = () => {
    if (this.tooltipRef.state.isVisible === true) {
      this.tooltipRef.toggleTooltip()
      this.props.toggleTooltip()
    }
  }

  render = () => {
    const item = this.props.item
    const specMargin = this.props.specMargin
    const twoMargin = (screenWidth - 40) / 3 / 2
    const marg = specMargin > 0 ? {marginRight: -twoMargin} : specMargin < 0 ? {marginLeft: -twoMargin} : {}

    return (
      <View style={{...styles.attributeWrapper, ...marg}} {...this._panResponder.panHandlers}>

        <Tooltip ref={ref => { this.tooltipRef = ref }} width={300} height={150} popover={<Text style={styles.tooltipText}>This is a tooltip! I should be vertically aligned over the attribute, Unless I am close to edge of the screen.This is a tooltip!</Text>}
          backgroundColor='rgba(250, 250, 250, 1)' withOverlay style={{margin: 5}} toggleOnPress={false}>
          <View style={{width: attrIconSize + 4, height: attrIconSize + 4, padding: 2, marginLeft: 1}}>
            <View style={styles.attributeButton}>
              <Icon name={item.icon} backgroundColor='rgba(0, 0, 0, 0)' size={attrIconSize - 10} style={styles.attribute} color='rgba(0, 0, 0, 1)' />
            </View>
          </View>
        </Tooltip>

        <Text style={{...styles.attributeText, width: (screenWidth - 40 - 40) / 3 - 30}} adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.4}>{item.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  attributeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  attributeButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: attrIconSize,
    height: attrIconSize,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 100
  },
  attributeText: {
    fontSize: attrIconSize / 2,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#222',
    fontFamily: 'Proxima Nova'
  },
  attribute: {
  },
  tooltipText: {
    width: 300,
    height: 150,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    margin: 5,
    padding: 10,
    fontFamily: 'Proxima Nova'
  }
})
