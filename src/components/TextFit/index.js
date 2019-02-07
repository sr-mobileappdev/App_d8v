import React, {Component} from 'react'
import {Text, Dimensions} from 'react-native'

import rnTextSize from 'react-native-text-size'

const {width} = Dimensions.get('window')

class TextFit extends Component {
  state = {
    size: 45,
    complete: false
  }

  componentDidMount() {
    this.setSize()
  }

  render() {
    const {style, text} = this.props
    const {complete, size} = this.state

    if (!complete) {
      return null
    }

    return (
      <Text
        style={[
          style,
          {
            fontSize: size,
            lineHeight: size + 5
          }
        ]}
      >
        {text}
      </Text>
    )
  }

  async setSize() {
    const {style, text} = this.props
    let {size} = this.state

    let measure = await rnTextSize.measure({
      ...style,
      text,
      fontSize: size,
      width: width - 40
    })

    while (measure.lineCount > 3) {
      size -= 1

      measure = await rnTextSize.measure({
        text: this.props.text,
        ...style,
        fontSize: size,
        width: width - 40
      })
    }

    this.setState({
      complete: true,
      size: size
    })
  }
}

export default TextFit
