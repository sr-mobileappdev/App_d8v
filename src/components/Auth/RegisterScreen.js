import React from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {AuthForm} from './AuthForm'
import NavigationService from 'src/utils/NavigationService'
import AppLogo from 'src/components/AppLogo'

export class RegisterScreen extends React.PureComponent {
  static propTypes = {
    footNote: PropTypes.shape({
      text: PropTypes.string,
      actionText: PropTypes.string,
      actionRef: PropTypes.string
    }),
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: () => {}
  }

  render() {
    const {mainButtonText} = this.props
    return (
      <Container>
        <Header>
          <TouchableWithoutFeedback onPress={() => NavigationService.goBack()}>
            <Image source={require('src/assets/icons/x-close.png')} />
          </TouchableWithoutFeedback>
        </Header>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <ContentContainer>
          <AuthForm
            onSubmit={this.props.onSubmit}
            isSignup
            mainButtonText={mainButtonText}
          />
        </ContentContainer>
      </Container>
    )
  }
}

const Container = styled.View`
  flex:1;
  justifyContent: center;
  alignItems: center;
  flexDirection: column;
`

const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  justifyContent: flex-start;
  alignItems: center;
  flexDirection: column; 
  minHeight: 350;
`
const Header = styled.View`      
   marginTop: 30;
   marginLeft: 20;
   padding: 10px;
   alignSelf: flex-start;
   width: 50;
   height: 50;
   alignItems: center;
   justifyContent: center;
`
const LogoContainer = styled.View`
  marginVertical: 15;
`
