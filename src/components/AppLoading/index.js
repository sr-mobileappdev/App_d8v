import React from 'react'
import PropTypes from 'prop-types'
import {ActivityIndicator} from 'react-native'

import {AppContainer} from 'src/components/UI/AppContainer'
import {noop} from 'src/utils/fn'
import {theme} from 'src/theme'

export class AppLoading extends React.PureComponent {
  static propTypes = {
    onMount: PropTypes.func
  }
  static defaultProps = {
    onMount: noop
  }

  componentDidMount() {
    this.props.onMount()
  }

  render() {
    return (
      <AppContainer justify>
        <ActivityIndicator size='large' color={theme.colors.white} />
      </AppContainer>
    )
  }
}
