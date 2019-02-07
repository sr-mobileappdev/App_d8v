import {geoLocation} from 'src/components/GeoLocation/reducer'
import {placeReaOwnershipReducers} from 'src/containers/PlaceReqOwnership/reducer'
import {businessSearch} from 'src/screens/Search/reducer'
import {userProfile} from 'src/containers/UserProfile/reducer'

export const AppReducers = {
  ...placeReaOwnershipReducers,
  geoLocation,
  businessSearch,
  userProfile
}
