import React from 'react'
import { Keyboard, TouchableOpacity } from 'react-native'
import {InputText} from '../UI/InputText'
import {FormContainer} from '../UI/FormContainer'
import {Button} from '../UI/Button'
import Toast from 'react-native-simple-toast'
import NavigationService from 'src/utils/NavigationService'
import styled from 'styled-components'
import { isEmpty } from 'lodash';

const REGEX = {
  mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /\d{8,10}/
}

export class AuthForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
    };
  }

  render() {
    const { isSignup, mainButtonText } = this.props

    return (
      <FormContainer center justify>
        <InputText
          label='Email or Phone'
          onChangeText={emailOrPhone => this.setState({ emailOrPhone })}
          value={this.state.emailOrPhone}
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={() => this.passwordField.focus()}
          onBlur={() => this.validateFields()}
          autoCorrect={false}
        />
        <InputText
          forwardedRef={ref => this.passwordField = ref}
          value={this.state.password}
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={() => this.confirmPasswordField && this.confirmPasswordField.focus()}
          onBlur={() => this.validateFields()}
        />
        {isSignup && (
          <InputText
            forwardedRef={ref => this.confirmPasswordField = ref}
            value={this.state.confirmPassword}
            label='Repeat Password'
            secureTextEntry
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            onBlur={() => this.validateFields()}
          />
        )}
        <Button
          white
          onPress={this.onSubmit}
          isLoading={this.props.isLoading}
        >
          {mainButtonText}
        </Button>
        {!isSignup &&
          <TouchableOpacity onPress={this.onForgotPassword}>
            <LostPassword>
              Lost Password
            </LostPassword>
          </TouchableOpacity>
        }
      </FormContainer>
    )
  }

  validateFields = () => {
    const { emailOrPhone, password, confirmPassword } = this.state;
    const { isSignup } = this.props;

    // Check email
    if (!(REGEX['phone'].test(emailOrPhone) || REGEX['mail'].test(emailOrPhone))) {
      Toast.show('Please input a valid email address or phone number.');
      return false;
    }

    // Check password
    if (isEmpty(password) || (isSignup && isEmpty(confirmPassword))) {
      Toast.show('Please input password.');
      return false; // Password mismatch
    }

    const isValidPassword = isSignup ? password === confirmPassword : true;
    if (!isValidPassword) {
      Toast.show('The passwords should match.');
      return false; // Password mismatch
    }

    return true;
  }

  onSubmit = () => {
    const { emailOrPhone, password } = this.state;

    // Validate input fields
    if (!this.validateFields()) {
      return;
    }

    // Dismiss keyboard before navigate to other scene
    Keyboard.dismiss();

    // Trigger submit action
    this.props.onSubmit({ firstValue: emailOrPhone, password });
  }

  onForgotPassword = () => {
    Keyboard.dismiss()
    NavigationService.navigate('RememberPassword')
  }
}

const LostPassword = styled.Text`
  color: white;
  font-size: 12;
  font-weight: bold;
  marginBottom: 15;
  alignSelf: center;
`
