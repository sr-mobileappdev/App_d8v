import React from 'react'
import {connect} from 'react-redux'
import {
  Alert,
  ImageBackground,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import login from 'src/store/actions/login'
import {LoginScreen} from 'src/components/Auth/LoginScreen'
import {auth} from 'src/utils/auth'
import {extractErrorMessage, log} from 'src/utils/fn'
import { Loading } from 'src/components/Loading';

@connect(
  null,
  {login}
)
export class UserLogin extends React.PureComponent {
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
          <LoginScreen
            mainButtonText='Log In'
            footNote={{
              text: "Don't have an account?",
              actionText: 'Sign up',
              actionRef: 'SignUp'
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

  testAction() {
    Alert.alert('Whoops!', 'Action Triggered')
  }

  handleFormOnSubmit = async ({firstValue, password, isSms}, formType) => {
    const { login, navigation } = this.props;
    // this code in general will probably dissapear later
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
      const result = await login({email: firstValue.trim(), password})
      console.log('result = ', result);

      this.setState({isLoading: false})

      if (result && result.response && result.response.token) {
        await auth.setToken(result.response.token)
        navigation.navigate('App')
      } else {
        // todo treat errors
        if (result.error.errors) {
          Alert.alert('Whoops!', result.error.errors.email[0])
        } else if (result.error.exception) {
          Alert.alert(
            'Whoops!',
            "Email doesn't exist. Please create an account"
          )
        } else {
          Alert.alert('Whoops!', 'Sorry, there is no internet connection to login.')
        }
      }
    } catch (e) {
      Alert.alert('Whoops!', extractErrorMessage(e))
      this.setState({isLoading: false})
    }
  }
}
