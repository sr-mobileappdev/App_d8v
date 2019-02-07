/**
 * @format
 * @flow
 */

/**
 * TouchableItem renders a touchable that looks native on both iOS and Android.
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity.
 *
 * On iOS you can pass the props of TouchableOpacity, on Android pass the props
 * of TouchableNativeFeedback.
 */
import * as React from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'

const ANDROID_VERSION_LOLLIPOP = 21

export type TouchableProps = {
  onPress?: () => any,
  delayPressIn?: number,
  borderless?: boolean,
  pressColor?: string,
  activeOpacity?: number,
  children?: React.Node,
  style?: any,
  innerContainerStyle?: any
}

type TouchableType = React.StatelessFunctionalComponent<React.Element<typeof TouchableNativeFeedback | typeof TouchableOpacity>>

const Touchable: TouchableType = (props: TouchableProps) => {
  const {style, children, innerContainerStyle, ...rest} = props

  /*
   * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
   * therefore only enable it on Android Lollipop and above.
   *
   * All touchables on Android should have the ripple effect according to
   * platform design guidelines.
   * We need to pass the background prop to specify a borderless ripple effect.
   */
  if (
    Platform.OS === 'android' &&
    Platform.Version >= ANDROID_VERSION_LOLLIPOP
  ) {
    return (
      <TouchableNativeFeedback
        {...rest}
        style={style}
        background={TouchableNativeFeedback.Ripple(
          props.pressColor || '',
          props.borderless || false
        )}
      >
        <View style={innerContainerStyle}>{children}</View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <TouchableOpacity {...rest} style={style}>
      <View style={innerContainerStyle}>{children}</View>
    </TouchableOpacity>
  )
}

Touchable.defaultProps = {
  borderless: false,
  pressColor: 'rgba(0, 0, 0, .32)'
}

export default Touchable
