import React from 'react'

import {auth} from 'src/utils/auth'
import {AppLoading} from 'src/components/AppLoading'

export class AuthLoading extends React.PureComponent {
  constructor () {
    super()
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    await auth.bootstrap()
    const userIsLoggedIn = auth.isLoggedIn()

    this.props.navigation.navigate(userIsLoggedIn ? 'App' : 'Auth')
  }

  render () {
    return <AppLoading />
  }
}
