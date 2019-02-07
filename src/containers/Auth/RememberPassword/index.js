import React from 'react'
import {ImageBackground} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {RememberPassword as RememberPasswordForm} from 'src/components/Auth/RememberPassword'

export class RememberPassword extends React.PureComponent {
  state = {
    isLoading: false,
    requireCode: false
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='always'>
        <ImageBackground
          resizeMode='cover'
          source={require('src/assets/images/log-in-bg.png')}
          style={{height: '100%', width: '100%'}}
        >
          <RememberPasswordForm
            onSubmit={this.handleFormOnSubmit}
            isLoading={this.state.isLoading}
          />
        </ImageBackground>
      </KeyboardAwareScrollView>
    )
  }

  handleFormOnSubmit = async (email) => {
    if (!email) {
      return
    }
    try {
      // implement password recovery
    } catch (e) {
      // error handling
    }
  }
}
