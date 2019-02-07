import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {InputText} from 'src/components/UI/InputText'
import {Button} from 'src/components/UI/Button'
import {FormContainer} from 'src/components/UI/FormContainer'

export class AuthEmailForm extends PureComponent {
  static propTypes = {
    actionText: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func
  }
  static defaultProps = {
    onSubmit: () => {}
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
    this.email = React.createRef()
    this.password = React.createRef()
  }

  render() {
    return (
      <FormContainer center justify>
        <InputText
          forwardedRef={this.email}
          placeholder='Email'
          keyboardType='email-address'
          textContentType='emailAddress'
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={() => {
            if (this.password && this.password.current) {
              this.password.current.focus()
            }
          }}
        />

        <InputText
          forwardedRef={this.password}
          placeholder='Password'
          secureTextEntry
          onChangeText={password => this.setState({password})}
          value={this.state.password}
          onSubmitEditing={() => {
            this.handleActionPress()
          }}
        />

        <Button
          black
          onPress={this.handleActionPress}
          isLoading={this.props.isLoading}
        >
          {this.props.actionText}
        </Button>
      </FormContainer>
    )
  }

  handleActionPress = () => {
    this.props.onSubmit(this.state)
  }
}
