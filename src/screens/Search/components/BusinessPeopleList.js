import React from 'react'
import {FlatList, View, StyleSheet, Image} from 'react-native'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

import {theme} from 'src/theme'
import {moderateScale} from 'src/utils/scaling'

export class BusinessPeopleList extends React.Component {
  render() {
    const {people, searchValue} = this.props

    return (
      !!people.length &&
        !!searchValue.trim().length && (
        <FlatList
          listKey='People'
          contentContainerStyle={{padding: 15}}
          data={people}
          keyExtractor={person => person.fullName}
          renderItem={this.renderPeopleItem}
        />
      )
    )
  }

    renderPeopleItem = ({item}) => (
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Image source={{uri: item.photoUrl}} style={styles.avatar} />
        <PeopleNameContainer>
          <PeopleName>{item.fullName}</PeopleName>
        </PeopleNameContainer>
      </View>
    )
}

const styles = StyleSheet.create({
  avatar: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    borderWidth: 1,
    borderColor: '#fff'
  }
})

const PeopleName = styled(StyledText)`
  color: ${theme.colors.black};
  font-size: 24px;
  font-weight: ${theme.fontWeight.lighter};
  margin-left: 10px;
`

const PeopleNameContainer = styled.View`
    justify-content: center;
`
