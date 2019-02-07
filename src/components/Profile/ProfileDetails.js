import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import {View} from 'react-native'
import {Picker} from 'react-native-picker-dropdown'

import {ProfileCard} from 'src/components/Profile/ui/ProfileCard'
import StyledText from 'src/components/StyledText'

export function ProfileUserDetails ({user, onProfileEdit, style}) {
  return (
    <ProfileInfoCardContainer {...{style}}>
      <InfoRow>
        <InfoColumn>
          <ColumnDescription>Age</ColumnDescription>
          <ProfilePicker
            selectedValue={user.age}
            onValueChange={age => onProfileEdit({...user, age})}
            style={{minWidth: 130}}
          >
            <Picker.Item label='20 - 25' value='20 - 25' />
            <Picker.Item label='26 - 30' value='26 - 30' />
            <Picker.Item label='31 - 35' value='31 - 35' />
            <Picker.Item label='36 - 40' value='36 - 40' />
          </ProfilePicker>
        </InfoColumn>

        <InfoColumn last>
          <ColumnDescription>Gender</ColumnDescription>
          <ProfilePicker
            selectedValue={user.gender}
            onValueChange={gender => onProfileEdit({...user, gender})}
          >
            <Picker.Item label='Male' value='Male' />
            <Picker.Item label='Female' value='Female' />
            <Picker.Item label='Unspecified' value='Unspecified' />
          </ProfilePicker>
        </InfoColumn>
      </InfoRow>

      <InfoRow>
        <InfoColumn last>
          <ColumnDescription>Your interests</ColumnDescription>
          <BadgeContainer>
            {['grooming', 'festivals', 'dogs', 'beagles', 'husky'].map(interest => (
              <Badge key={interest} size={44}>{interest}</Badge>
            ))}
          </BadgeContainer>
        </InfoColumn>
      </InfoRow>

      <InfoRow last>
        <InfoColumn last>
          <ColumnText>15 Reviews left</ColumnText>
        </InfoColumn>
      </InfoRow>

    </ProfileInfoCardContainer>
  )
}

export function ProfilePlaceDetails ({place: {attributes, categories}, place, style}) {
  return (
    <ProfileInfoCardContainer {...{style}}>
      {!!attributes.length && (
        <InfoRow>
          <InfoColumn last>
            <ColumnDescription>Attributes</ColumnDescription>
            {attributes.map(({id, key, value}) => (
              <ColumnText key={id}>{key}: {value}</ColumnText>
            ))}
          </InfoColumn>
        </InfoRow>
      )}

      {!!categories.length && (
        <InfoRow>
          <InfoColumn last>
            <ColumnDescription>Categories</ColumnDescription>
            <BadgeContainer>
              {categories.map(({pivot, name}) => (
                <Badge key={pivot.category_id} size={44}>{name}</Badge>
              ))}
            </BadgeContainer>
          </InfoColumn>
        </InfoRow>
      )}

      <InfoRow last>
        <InfoColumn last style={{flex: 1, paddingRight: 0}}>
          <ColumnDescription>Information</ColumnDescription>

          <View style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
            <ColumnText>10:00 AM - 10:00 PM</ColumnText>
            <ColumnText style={{color: '#4CD964', textAlign: 'right'}}>Open now</ColumnText>
          </View>
        </InfoColumn>
      </InfoRow>

    </ProfileInfoCardContainer>
  )
}

// //
const ProfilePicker = styled(Picker)`
  width: 100%;
  flex: 1;
  min-width: 140px;
  margin-left: -12px;
`

const ProfileInfoCardContainer = styled(ProfileCard)`
  flex-direction: column;
  font-size: 20px;
  color: #25272c;
  padding-top: 20px;
`
const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-style: solid;
  border-bottom-color: #e8e9ea;
  border-bottom-width: 2px;
  
  ${is('last')`
    border-bottom-width: 0;
    margin-bottom: 0;
  `};
`
const InfoColumn = styled.View`
  flex-direction: column;
  border-style: solid;
  border-right-color: #e8e9ea;
  border-right-width: 2px;
  margin-right: 30px;
  padding-right: 50px;
  
  ${is('last')`
    border-right-width: 0;
    margin-right: 0;
  `};
`
const ColumnDescription = styled(StyledText)`
  font-weight: bold;
  font-size: 16px;
  color: #25272c;
`
const ColumnText = styled(StyledText)`
  font-size: 16px;
  color: #292c2f;
`

const Badge = styled(StyledText)`
  background-color: #2d2f35;
  color: #fff;
  text-transform: capitalize;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 16px;
  font-weight: bold;
`
const BadgeContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px -5px;
`
