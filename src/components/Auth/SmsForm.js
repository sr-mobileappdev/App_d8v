import React from 'react'
import PropTypes from 'prop-types'

import {InputText} from 'src/components/UI/InputText'
import {Button} from 'src/components/UI/Button'
import {FormContainer} from 'src/components/UI/FormContainer'

export class AuthSmsForm extends React.PureComponent {
  static propTypes = {
    actionText: PropTypes.string.isRequired,
    requireCode: PropTypes.bool,
    onSubmit: PropTypes.func
  }
  static defaultProps = {
    onSubmit: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      phone: ''
    }
  }

  render () {
    const {requireCode} = this.props

    return (
      <FormContainer center justify>
        {requireCode ? (
          <InputText
            placeholder='Received sms code'
            keyboardType='number-pad'
            onChangeText={code => this.setState({code})}
            value={this.state.code}
          />
        ) : (
          <InputText
            placeholder='Phone number'
            keyboardType='phone-pad'
            onChangeText={phone => this.setState({phone})}
            value={this.state.phone}
          />
        )}

        <Button black onPress={this.handleActionPress}>{this.props.actionText}</Button>
      </FormContainer>
    )
  }

  handleActionPress = () => {
    this.props.onSubmit({
      ...this.state,
      isCode: this.props.requireCode
    })
  }
}
