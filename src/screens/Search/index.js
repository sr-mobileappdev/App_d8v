import React, {Component} from 'react'
import {FlatList, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import { debounce } from 'lodash'
import styled from 'styled-components'
import {theme} from 'src/theme'
import StyledText from 'src/components/StyledText'

import {searchBusinesses} from './actions'
import {geoLocationCoordsSelector} from 'src/components/GeoLocation/selectors'
import {
  businessSearchValueSelector,
  businessDataSelector,
  businessCategoriesDataSelector,
  businessTotalMetaSelector,
  businessCurrentPageMetaSelector,
  businessSearchLoadingStatusSelector
} from './selectors'

import {BusinessCategoriesList} from './components/BusinessCategoriesList'
import {BusinessPeopleList} from './components/BusinessPeopleList'

import BusinessCard from './components/BusinessCard'

import SearchHeader from './SearchHeader'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// TODO: connect to map coordinates

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state),
  searchValue: businessSearchValueSelector(state),
  businesses: businessDataSelector(state),
  categories: businessCategoriesDataSelector(state),
  total: businessTotalMetaSelector(state),
  page: businessCurrentPageMetaSelector(state),
  searching: businessSearchLoadingStatusSelector(state)
})
const mapDispatchToProps = {
  searchBusinesses
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class BusinessSearch extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.searchValue) {
      return {
        ...prevState,
        searchValue: nextProps.searchValue
      }
    }

    return null
  }

  state = {
    searchValue: '',
    showByCategory: false,
    selectedCategory: {},
    people: [
      {
        id: Math.random() * 1000,
        photoUrl: 'https://i.imgur.com/BU6IIVY.jpg',
        fullName: 'Dean Michel'
      },
      {
        id: Math.random() * 1000,
        photoUrl: 'https://i.imgur.com/oKBikhU.jpg',
        fullName: 'Sarah Lacy'
      }
    ]
  }

  componentDidUpdate (prevProps) {
	if (prevProps.searchValue !== this.props.searchValue && this.props.searchValue.length > 0) {
      this.setState({showByCategory: false})
      this.searchBusinesses.cancel()
      this.searchBusinesses()
    }
  }

  searchBusinesses = debounce(async (nextPage) => {
    const {
      userLocation,
      mapCoords,
      searchValue,
      searchBusinesses,
      page = 1
    } = this.props

    const coords = mapCoords || userLocation
    const searchPage = nextPage || page

    searchBusinesses(searchValue, searchPage, coords)
  }, 500, {
    'leading': true,
    'trailing': false
  })

  keyExtractor = business => String(business.id)

  loadMoreBusinesses = () => {
    const {page} = this.props

    const {
      businesses,
      total
    } = this.props

    const hasMoreItemsToLoad = businesses.length < total

    if (!hasMoreItemsToLoad) {
      return
    }

    this.searchBusinesses(page + 1)
  }

  onCategoryClicked = (category) => {
    this.setState({showByCategory: true})
    this.setState({selectedCategory: category})
  }

  hideCategory = () => {
    this.setState({showByCategory: false})
  }

  renderListHeader = () => {
    const {categories} = this.props
    const {people, searchValue, selectedCategory} = this.state

    return (
      <>
        {this.state.showByCategory === false ? <BusinessCategoriesContainer>
          <SectionTitle>Categories</SectionTitle>
          <BusinessCategoriesList searchValue={searchValue} categories={categories} onCategoryClicked={this.onCategoryClicked} />
          <SectionTitle>People</SectionTitle>
          <BusinessPeopleList searchValue={searchValue} people={people} />
        </BusinessCategoriesContainer>
          : <SelectedCategoryContainer>
            <SelectedCategoryName>
              {selectedCategory.name}
            </SelectedCategoryName>
            <TouchableOpacity onPress={() => this.hideCategory()}>
              <MaterialIcons name='close' color={`#${theme.colors.black}`} borderWidth={10} size={35} />
            </TouchableOpacity>
          </SelectedCategoryContainer>}

        <View>
          <SectionTitle>Places</SectionTitle>
        </View>
      </>
    )
  }

  renderBusinessCard = ({item: business}) => {
    return (
      <BusinessCard
        {...business}
        style={{marginBottom: 20}}
      />
    )
  }

  render () {
    const {businesses, searchValue} = this.props

    return (
      <Container>
        <SearchHeader
          isFocused
          inversed
          withBack

        />

        <FlatList
          contentContainerStyle={{paddingHorizontal: 15}}
          data={searchValue === '' ? [] : businesses}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderBusinessCard}
          ListHeaderComponent={this.renderListHeader}
          onEndReached={this.loadMoreBusinesses}
          onEndReachedThreshold={0}
        />
      </Container>
    )
  }
}

// //
const Container = styled.View`
  flex: 1;
  background-color: #FFF;
`

const SectionTitle = styled(StyledText)`
  color: #BCBDC2;
  font-size: 14px;
  margin-vertical: 20px;
`

const BusinessCategoriesContainer = styled.View`
  padding-bottom: 20px;
`
const SelectedCategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
const SelectedCategoryName = styled(StyledText)`
color: ${theme.colors.black};
font-size: 20px;
margin-horizontal: 10px;
`
