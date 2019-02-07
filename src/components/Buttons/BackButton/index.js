import React, {PureComponent} from 'react'
import {View, Image, TouchableWithoutFeedback} from 'react-native'
import {withNavigation, NavigationActions} from 'react-navigation'

import Icon from './icons/back.png'
import WhiteIcon from './icons/white-back.png'

class BackButton extends PureComponent {
  render () {
    const {isWhite, containerStyle} = this.props

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
      >
        <View style={containerStyle}>
          <Image source={isWhite ? WhiteIcon : Icon} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  onPress = () => {
    const {navigation, onPress} = this.props

    if (onPress) {
      return onPress()
    }

    navigation.dispatch(NavigationActions.back())
  }
}

export default withNavigation(BackButton)
