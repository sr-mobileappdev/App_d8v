import React from 'react'
import styled from 'styled-components'
import {TouchableWithoutFeedback} from 'react-native'
import {InputText} from '../UI/InputText'
import {Button} from '../UI/Button'
import NavigationService from 'src/utils/NavigationService'
import AppLogo from 'src/components/AppLogo'
import Toast from 'react-native-simple-toast'

const REGEX = {
  mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /\d{8,10}/
}

export class RememberPassword extends React.PureComponent {

  state = {
    value: '',
  }

  render() {
    return (
      <Container>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <Title>
          Remember password
        </Title>
        <InputText
          label='email or Phone'
          onChangeText={value => this.setState({ value })}
          value={this.state.value}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <Button
          white
          onPress={this.onSubmit}
        >
          Send Link
        </Button>
        <TouchableWithoutFeedback onPress={() => NavigationService.goBack()}>
          <RememberText>
            Remember it?<Login> Log In</Login>
          </RememberText>
        </TouchableWithoutFeedback>
      </Container>
    )
  }

  validateField = () => {
    const { value } = this.state;

    // Validate phone or email field
    if (REGEX['phone'].test(value) || REGEX['mail'].test(value)) {
      return true;
    }

    Toast.show('Please input a valid email address or phone number.');
    return false;
  }

  onSubmit = () => {
    if (this.validateField()) {
      this.props.onSubmit();
    }
  };
}

const Container = styled.View`
  flex:1;
  alignItems:center;
`
const RememberText = styled.Text`
  font-size: 14;
  color: white;
`
const Login = styled.Text`
  font-size: 14;
  color: white;
  font-weight: bold;
`

const Title = styled.Text`
  marginBottom: 50;
  font-size: 22;
  color: white;
  font-weight: bold;
`
const LogoContainer = styled.View`
  marginTop: 95;
  marginBottom: 15;
`
