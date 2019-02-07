import React from 'react'
import {
  TouchableOpacity,
  Platform,
  Linking
} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components'
import {connect} from 'react-redux'

import {ProfileCard} from 'src/components/Profile/ui/ProfileCard'
import {SectionTitle} from 'src/components/Profile/ui'
import {geoLocationCoordsSelector} from 'src/components/GeoLocation/selectors'
import StyledText from 'src/components/StyledText'

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state)
})

@connect(mapStateToProps)
export class ProfileDistance extends React.PureComponent {
  render = () => {
    const {place, attributes, userLocation} = this.props
    const {lat, lng} = userLocation

    if (!this.hasAddressAttribute()) {
      return null
    }

    const distance = coordsToDistance({
      lat1: lat,
      lng1: lng,
      lat2: place.lat,
      lng2: place.lng
    })

    // TODO; review with styled-components
    return (
      <ProfileCard>
        <SectionTitle>{attributes['ADDY']}</SectionTitle>

        <WhiteFakeButton>
          <TextButton>{distance}m from you</TextButton>
        </WhiteFakeButton>

        <HorizontalRule />

        <DirectionContainer>
          <DirectionButton onPress={this.handleDirectionOnPress}>
            <FontAwesomeIcon name='paper-plane' color='#FFFFFF' />
            <DirectionTextButton>Directions</DirectionTextButton>
          </DirectionButton>

          <UberButton>
            <FontAwesomeIcon name='car' color='#FFFFFF' />
            <DirectionTextButton>Uber Ride</DirectionTextButton>
          </UberButton>
        </DirectionContainer>
      </ProfileCard>
    )
  }

  handleDirectionOnPress = () => {
    const {place} = this.props
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='})
    const latLng = `${place.lat},${place.lng}`
    const label = place.name
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    })

    Linking.openURL(url)
  }

  hasAddressAttribute = () => !!this.props.attributes[ 'ADDY' ]
}

// //
const WhiteFakeButton = styled.View`
  border-width: 1px;
  border-color: #8c8c8c;
  padding: 7px 15px;
  border-radius: 4px;
  align-self: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
const TextButton = styled(StyledText)`
  color: #8C8C8C;
`
const HorizontalRule = styled.View`
  border-bottom-color: #d8d8d8;
  border-bottom-width: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
`
const DirectionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const DirectionButton = styled(WhiteFakeButton.withComponent(TouchableOpacity))`
  background-color: #8c8f92;
`
const UberButton = styled(DirectionButton)`
  background-color: #272a2f;
`
const DirectionTextButton = styled(StyledText)`
  color: #FFFFFF;
  padding-left: 20px
`

//
function degreesToRadians (degrees) {
  return degrees * (Math.PI / 180)
}

export default function coordsToDistance ({lat1, lng1, lat2, lng2}) {
  const earthRadiusInKm = 6371
  const dLat = degreesToRadians(lat2 - lat1)
  const dLng = degreesToRadians(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round(earthRadiusInKm * c)
}
