import React from 'react'
import styled from 'styled-components'

import {theme} from 'src/theme'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      this.setFocus()
    }, 200)
  }

  componentDidUpdate() {
    this.setFocus()
  }

  render() {
    const {blurOnFocus, isFocused, inversed} = this.props

    return (
      <InputField
        {...this.props}
        ref={blurOnFocus || isFocused ? this.inputRef : null}
        placeholderTextColor={!inversed ? PLACEHOLDER_COLOR : INVERSED_COLOR}
        onFocus={this.onFocus}
      />
    )
  }

  setFocus = () => {
    if (this.props.isFocused) {
      this.inputRef.current.focus()
    }
  }

  onFocus = () => {
    const {onFocus, blurOnFocus} = this.props

    if (blurOnFocus) {
      this.inputRef.current.blur()
    }

    if (onFocus) {
      onFocus()
    }
  }
}

// //
const PLACEHOLDER_COLOR = 'rgba(255, 255, 255, 0.6)'
const INVERSED_COLOR = '#7A7C8A'

const InputField = styled.TextInput`
  height: 44px;
  width: 100%;
  background-color: ${props =>
    !props.inversed ? 'rgba(255, 255, 255, 0.25)' : '#F2F2F2'};
  border-radius: 20px;
  padding-vertical: 5px;
  padding-horizontal: 20px;
  font-size: 17px;
  font-weight: 700;
  font-family: ${theme.fonts.ProximaNova};
  color: ${props =>
    !props.inversed ? 'rgba(255, 255, 255, 1)' : INVERSED_COLOR};
`
