import {createSelector} from 'reselect'

export const geoLocationSelector = state => state.geoLocation

export const geoLocationCoordsSelector = createSelector(geoLocationSelector,
  geoLocation => ({
    lat: geoLocation.coords.latitude,
    lng: geoLocation.coords.longitude
  })
)
