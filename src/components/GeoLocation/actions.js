export const GEO_LOCATION_REQUESTING = 'GEO_LOCATION_REQUESTING'
const locationRequesting = () => ({type: GEO_LOCATION_REQUESTING})

export const GEO_LOCATION_FAILED = 'GEO_LOCATION_FAILED'
function locationRequestFailed (error) {
  return {
    type: GEO_LOCATION_FAILED,
    payload: error
  }
}

export const GEO_LOCATION_RECEIVED = 'GEO_LOCATION_RECEIVED'
function locationReceived (position) {
  return {
    type: GEO_LOCATION_RECEIVED,
    payload: position
  }
}

export function locationRequest () {
  return function (dispatch) {
    dispatch(locationRequesting())

    return navigator.geolocation.getCurrentPosition(
      (position) => dispatch(locationReceived(position)),
      (error) => dispatch(locationRequestFailed(error)), {
        enableHighAccuracy: false,
        timeout: 20000
      }
    )
  }
}
