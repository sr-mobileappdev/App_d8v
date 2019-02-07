import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Picker} from 'react-native-picker-dropdown'

import AppLogo from 'src/components/AppLogo'
import {AppContainer} from 'src/components/UI/AppContainer'
import {TextButton} from 'src/components/UI/TextButton'
import {AuthEmailForm} from 'src/components/Auth/EmailForm'
import NavigationService from 'src/utils/NavigationService'
import StyledText from 'src/components/StyledText'

export class AuthForm extends React.PureComponent {
  static propTypes = {
    formText: PropTypes.string,
    footNote: PropTypes.shape({
      text: PropTypes.string,
      actionText: PropTypes.string,
      actionRef: PropTypes.string
    }),
    requireCode: PropTypes.bool,
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
  }
  static defaultProps = {
    onSubmit: () => {}
  }

  static FORM_TYPE = {
    EMAIL: 0,
    SMS: 1
  }

  state = {
    formType: 0
  }

  render() {
    const {formType} = this.state
    const {requireCode, footNote, isLoading, formText} = this.props

    const isEmailFormType = formType === AuthForm.FORM_TYPE.EMAIL
    const AuthFormComponent = AuthEmailForm
    const authFormProps = {
      isLoading,
      actionText: formText,
      onSubmit: this.handleFormSubmit,
      ...(isEmailFormType && {
        requireCode
      })
    }

    return (
      <AppContainer justify>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>

        <ContentContainer>
          <TitleContainer>
            <Title>{formText} by</Title>
            <FormTypePicker
              selectedValue={formType}
              onValueChange={this.onFormTypeChange}
              mode='dropdown'
            >
              <Picker.Item label='Email' value={AuthForm.FORM_TYPE.EMAIL} />
              <Picker.Item label='SMS' value={AuthForm.FORM_TYPE.SMS} />
            </FormTypePicker>
          </TitleContainer>

          <AuthFormComponent {...authFormProps} />
          {isLoading && <AuthLoadingOverlay />}
        </ContentContainer>

        <NoteContainer>
          <NoteText>{footNote.text}</NoteText>
          <TextButton
            onPress={() => NavigationService.navigate(footNote.actionRef)}
          >
            {footNote.actionText}
          </TextButton>
        </NoteContainer>
      </AppContainer>
    )
  }

  onFormTypeChange = formType => {
    this.setState({formType})
  }

  handleFormSubmit = values => {
    this.props.onSubmit(values, this.state.formType)
  }
}

// //
const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  overflow: hidden;
  flex-shrink: 0;
  min-height: 270px;
`
const AuthLoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`
const FormTypePicker = styled(Picker)`
  width: 130px;
  margin-top: 2px;
`
const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const Title = styled(StyledText)`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`
const NoteContainer = styled.View`
  flex-direction: row;
`
const NoteText = styled(StyledText)`
  font-size: 16px;
  color: ${props => props.theme.colors.black};
`
const LogoContainer = styled.View`
  flex-shrink: 1;
`
