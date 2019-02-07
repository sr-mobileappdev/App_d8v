import React, {Component} from 'react'

import MapView from './containers/MapView'
import DiscoverView from './containers/DiscoverView'

export default class Explore extends Component {
  state = {
    centerCoords: null
  }

  onRegionChange = ({lat, lng}) => {
    this.setState({centerCoords: {lat, lng}})
  }

  onOpenBusinessSearch = () => {
    const {navigation} = this.props
    navigation.navigate('Search')
  }

  onOpenPlaceProfileModal = (placeId) => {
    const {navigation} = this.props
    navigation.navigate('BusinessProfile', {placeId})
  }

  render () {
    const {
      centerCoords
    } = this.state

    return (
      <>
        <MapView
          onRegionChange={this.onRegionChange}
          coords={centerCoords}
          openBusinessSearchModal={this.onOpenBusinessSearch}
          openBusinessProfile={this.onOpenPlaceProfileModal}
          onBackHome={this.props.onBackHome}
          isFocused={this.props.isFocused}
        />

        <DiscoverView
          coords={centerCoords}
          openBusinessSearchModal={this.onOpenBusinessSearch}
          openBusinessProfile={this.onOpenPlaceProfileModal}
        />
      </>
    )
  }
}
