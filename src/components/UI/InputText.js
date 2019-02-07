import React from 'react'
import {Animated} from 'react-native'
import styled from 'styled-components'
import is, {isNot} from 'styled-is'

export class InputText extends React.Component {
  state = {isFocused: false};
  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1)
  }
  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200
    }).start()
  }
  render() {
    const {fluid, forwardedRef, label, ...rest} = this.props
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [22, 0]
      }),
      fontSize: 14,
      color: '#ffffff'
    }
    return (
      <InputContainer {...{fluid}}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <InputText$$
          ref={forwardedRef}
          {...rest}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </InputContainer>
    )
  }

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.setState({isFocused: true})
  }

  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({ isFocused: false })
  }
}

const InputText$$ = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent'
})`
  height: 45px;
  marginTop: 15px;
  flex: 1;
  color: white; 
  fontWeight: bold;  
  paddingLeft: 0px;
  marginLeft: 0px;
`

const InputContainer = styled.View`
  border-bottom-width: 1;
  borderBottomColor: white;
  background-color: transparent;
  height: 55px;
  margin-bottom: 20px;  
  flex-direction: row;
  align-items: center;

  ${is('fluid')`
    flex: 1;
  `}
  ${isNot('fluid')`
    width: 70%;
  `}
`
