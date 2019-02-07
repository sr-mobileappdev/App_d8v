import React from 'react'

import TextInput from 'src/components/inputs/TextInput'

export class SearchInput extends React.Component {
  render() {
    const {value, style, onInput} = this.props

    return (
      <TextInput
        style={style}
        value={value}
        placeholder='Search'
        onChangeText={onInput}
        ref={this.setInputRef}
      />
    )
  }

  setInputRef = input => {
    this.button = input
  }
}
