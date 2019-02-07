import React, {PureComponent} from 'react'
import {FlatList} from 'react-native'
import {withNavigation} from 'react-navigation'
import styled from 'styled-components'

import {ProfileCard} from 'src/components/Profile/ui/ProfileCard'
import StyledText from 'src/components/StyledText'

class UserOwnBusinesses extends PureComponent {
  render () {
    const {profile} = this.props

    return (
      <>
        <Container>
          <Title>Profiles you own</Title>

          <FlatList
            data={profile.ownBusinesses}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </Container>
      </>
    )
  }

  openPlaceProfileModal = (placeId) => {
    const {navigation} = this.props
    navigation.navigate('BusinessProfile', {placeId})
  }

  keyExtractor = item => `${item.id}`;

  renderItem = ({item}) => (
    <PlaceListItem
      id={item.id}
      name={item.name}
      onItemPress={this.openPlaceProfileModal}
    />
  );
}

const PlaceListItem = React.memo(({onItemPress, id}) => (
  <PlaceItemContainer onPress={() => onItemPress(id)}>
    <PlaceItemText>
      {this.props.name}
    </PlaceItemText>
  </PlaceItemContainer>
))

// //
const Container = styled(ProfileCard)``
const Title = styled(StyledText)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.black}
`
const PlaceItemContainer = styled.TouchableOpacity`
  padding: 10px 15px;
`
const PlaceItemText = styled(StyledText)`
  font-size: 18px;
`

export default withNavigation(UserOwnBusinesses)
