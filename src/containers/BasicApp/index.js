import React, {Component} from 'react'

import {GeoLocation} from 'src/components/GeoLocation'
import RootStack from '../../router/navigation-stacks/BasicNavigationStack'

export default class BasicApp extends Component {
  static router = RootStack.router

  render() {
    const {navigation} = this.props

    return (
      <GeoLocation modal>
        <RootStack navigation={navigation} />
      </GeoLocation>
    )
  }
}
