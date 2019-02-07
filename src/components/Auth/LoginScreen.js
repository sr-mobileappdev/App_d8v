import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {AuthForm} from './AuthForm'
import NavigationService from 'src/utils/NavigationService'
import {Button} from '../UI/Button'
import AppLogo from 'src/components/AppLogo'

export class LoginScreen extends React.Component {
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
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <ContentContainer>
          <AuthForm
            onSubmit={this.props.onSubmit}
            mainButtonText={mainButtonText}
          />
        </ContentContainer>
        <Footer>
          <Button
            white
            small
            onPress={() => NavigationService.navigate('SignUp')}
          >
            Sign Up
          </Button>
          <TermsAndConditions
            onPress={() => NavigationService.navigate('TermsConditions')}
          >
            Terms & Conditions
          </TermsAndConditions>
        </Footer>
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
const Footer = styled.View`  
  flexDirection: row;
  justifyContent: flex-end;
  alignItems: center;
  paddingHorizontal: 10;
  marginTop: auto;
  height: 50;
`
const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  justifyContent: flex-start;
  alignItems: center;
  flexDirection: column;
  minHeight: 300;
`
const TermsAndConditions = styled.Text`
  color: white;
  font-size: 12;
  font-weight: bold;
  marginLeft: 40;
  marginBottom: 15;
`
const LogoContainer = styled.View`
  marginTop: 95;
  marginBottom: 15;
`
