import React from 'react'
import {
  Alert,
  ImageBackground,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import api from 'src/api'
import {RegisterScreen} from 'src/components/Auth/RegisterScreen'
import {extractErrorMessage, log} from 'src/utils/fn'
import { Loading } from 'src/components/Loading';

export class UserRegister extends React.PureComponent {
  state = {
    isLoading: false,
    requireCode: false
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='always'
      >
        <ImageBackground
          resizeMode='cover'
          source={require('src/assets/images/log-in-bg.png')}
          style={{height: '100%', width: '100%'}}
        >
          <RegisterScreen
            mainButtonText='Sign up'
            footNote={{
              text: 'Have an account already?',
              actionText: 'Sign in',
              actionRef: 'SignIn'
            }}
            onSubmit={this.handleFormOnSubmit}
            requireCode={this.state.requireCode}
            isLoading={this.state.isLoading}
          />
        </ImageBackground>
        {this.state.isLoading && <Loading showOverlay={true} />}
      </KeyboardAwareScrollView>
    )
  }

  handleFormOnSubmit = async ({firstValue, password}, formType) => {
    const {navigation} = this.props
    // this code is likely to disappear
    // if (formType === AuthForm.FORM_TYPE.SMS) {
    //   if (isCode) {
    //     // todo: send received code to server
    //     return
    //   }

    //   this.setState({requireCode: true})
    //   // todo: send phone number to server
    //   return
    // }

    if (!firstValue || !password) {
      return
    }

    try {
      this.setState({isLoading: true})
      const response = await api.create({
        route: `register`,
        data: {
          email: firstValue.trim(),
          password
        }
      })

      this.setState({isLoading: false})

      if (!response.errors) {
        Alert.alert(
          'Your account has been created successfully. You can now sign in!'
        )
        navigation.navigate('SignIn')
      } else {
        // TODO: treat error
        Alert.alert('Whoops!', extractErrorMessage(response))
      }
    } catch (e) {
      Alert.alert('Whoops!', extractErrorMessage(e))
      this.setState({isLoading: false})
    }
  }
}
