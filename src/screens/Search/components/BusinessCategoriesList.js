import React from 'react'
import {FlatList, View, TouchableHighlight} from 'react-native'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

import {theme} from 'src/theme'

export class BusinessCategoriesList extends React.Component {
  render() {
    const {categories, searchValue} = this.props

    return (
      !!categories.length &&
      !!searchValue.trim().length && (
        <FlatList
          listKey='Categories'
          contentContainerStyle={{padding: 15}}
          data={categories}
          keyExtractor={category => category.name}
          renderItem={this.renderCategoryItem}
        />
      )
    )
  }

  onCategoryClicked = (category) => {
    this.props.onCategoryClicked(category)
  }

  renderCategoryItem = ({item}) => (
    <View style={{flexDirection: 'row', marginBottom: 10, paddingRight: 20}}>
      <SearchValue>{this.props.searchValue}</SearchValue>
      <Category> in </Category>
      <TouchableHighlight onPress={() => this.onCategoryClicked(item)}>
        <Category> {item.name} </Category>
      </TouchableHighlight>
    </View>
  )
}

const SearchValue = styled(StyledText)`
  color: ${theme.colors.black};
  font-size: 24px;
  font-weight: ${theme.fontWeight.lighter};
`

const Category = styled(StyledText)`
  color: ${theme.colors.black};
  font-size: 24px;
  font-weight: ${theme.fontWeight.lighter};
`
