import React, {Component} from 'react'
import {FlatList} from 'react-native'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'

import styled from 'styled-components'

import api from 'src/api'
import GridItem from './components/GridItem'
import {log} from 'src/utils/fn'
import {geoLocationCoordsSelector} from 'src/components/GeoLocation/selectors'

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state)
})

@connect(mapStateToProps)
class DiscoverGrid extends Component {
  state = {
    items: [],
    loading: false,
    page: 1,
    totalItems: -1,
    error: null,
    refreshing: false
  }

  componentDidMount () {
    this.fetchPlaces()
  }

  fetchPlaces = async () => {
    const {page} = this.state
    const {coords, userLocation} = this.props

    const location = coords || userLocation

    this.setState({loading: true})

    try {
      const {data, meta: {total}} = await api.index({
        route: 'explore',
        query: {
          page,
          ...location
        }
      })

      this.setState(({items}) => ({
        items: [...items, ...data],
        totalItems: total,
        error: null,
        loading: false,
        refreshing: false
      }))
    } catch (error) {
      console.log(error)
      // TODO: treat error response correctly
      log.error('SERVER ERROR', error)

      this.setState({
        error,
        loading: false
      })
    }
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true
    }, this.fetchPlaces)
  }

  handleLoadMore = () => {
    console.log('discover handle load more')
    const {items, totalItems} = this.state
    const isMoreItemsToLoad = items.length < totalItems

    if (!isMoreItemsToLoad) {
      return
    }

    this.setState(({page}) => ({
      page: page + 1
    }), this.fetchPlaces)
  }

  renderListItem = ({item}) => (
    <GridItem
      onPress={this.props.openBusinessProfile}
      key={item.id}
      {...item}
    />
  )

  render () {
    return (
      <Container>
        <FlatList
          contentContainerStyle={{justifyContent: 'space-between'}}
          data={this.state.items}
          keyExtractor={item => item.id}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          numColumns={3}
          renderItem={this.renderListItem}
        />
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  padding: 0 7.5px;
`

export default withNavigation(DiscoverGrid)
