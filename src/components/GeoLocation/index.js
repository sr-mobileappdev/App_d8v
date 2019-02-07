import React from 'react'
import {connect} from 'react-redux'

import {PermissionsChecker} from 'src/components/PermissionsChecker'
import {AppLoading} from 'src/components/AppLoading'
import {locationRequest} from 'src/components/GeoLocation/actions'
import {
  geoLocationCoordsSelector,
  geoLocationSelector
} from 'src/components/GeoLocation/selectors'
import {isFunction} from 'src/utils/fn'

const mapStateToProps = state => ({
  locationIsRequested: geoLocationSelector(state).requested,
  locationIsRequesting: geoLocationSelector(state).requesting,
  userLocation: geoLocationCoordsSelector(state)
})
const mapDispatchToProps = {
  locationRequest
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class GeoLocation extends React.PureComponent {
  static defaultProps = {
    children: null
  }

  render() {
    const {
      locationIsRequested,
      locationIsRequesting,
      userLocation,
      children
    } = this.props

    const showLoading = locationIsRequesting || !locationIsRequested

    if (!showLoading && isFunction(children)) {
      return children(userLocation)
    }

    return (
      <PermissionsChecker
        types={['location']}
        messages={{
          location: {
            description: `Allow App access to your location.`,
            detail: `We need to access your location to provide you with the most personalized results around you.`,
            actionButton: `Allow`
          }
        }}
      >
        {showLoading ? (
          <AppLoading onMount={this.triggerGetLocation} />
        ) : (
          children
        )}
      </PermissionsChecker>
    )
  }

  triggerGetLocation = () => {
    this.props.locationRequest()
  }
}
