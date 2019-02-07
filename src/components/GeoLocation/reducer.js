import {
  GEO_LOCATION_FAILED,
  GEO_LOCATION_RECEIVED,
  GEO_LOCATION_REQUESTING
} from 'src/components/GeoLocation/actions'

const initialState = {
  coords: {
    latitude: 0,
    longitude: 0
  },
  requested: false,
  requesting: false,
  error: null
}

export function geoLocation (state = initialState, action) {
  switch (action.type) {
    case GEO_LOCATION_REQUESTING:
      return {
        ...state,
        requesting: true
      }

    case GEO_LOCATION_FAILED:
      return {
        ...state,
        error: action.payload,
        requested: true,
        requesting: false
      }

    case GEO_LOCATION_RECEIVED:
      return {
        ...initialState,
        requested: true,
        ...action.payload
      }

    default:
      return state
  }
}
