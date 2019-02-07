import React, {Component} from 'react'
import { debounce } from 'lodash'

import api from 'src/api'
import PlaceProfileDetails from 'src/components/Profile/PlaceProfile'
// import {log} from 'src/utils/fn'
import {transformProfileData} from 'src/utils/apiData'

export class PlaceProfile extends Component {
  state = {
    placeId: null,
    place: null,
    loadingPlaceDetails: false,
    feed: [],
    feedTotalCount: 0,
    feedPage: 1
  }

  componentDidMount() {
    const {navigation} = this.props
    const placeId = navigation.getParam('placeId')

    this.setState(() => ({placeId}), this.loadPlaceData)
  }

  render() {
    const {place, feed} = this.state

    return (
      <PlaceProfileDetails
        onFeedbackSent={this.reloadPlaceData}
        profile={place}
        feed={feed}
        loadMoreFeed={this.handleLoadMoreFeed}
      />
    )
  }

  loadPlaceData = () => {
    this.loadPlaceDetails()
    this.loadPlaceFeed()
  }

  loadPlaceDetails = async () => {
    const {placeId, loadingPlaceDetails} = this.state

    if (!placeId || loadingPlaceDetails) {
      return
    }

    this.setState(() => ({loadingPlaceDetails: true}))

    try {
      const response = await api.show({
        route: `businesses`,
        id: placeId
      })

      this.setState(() => ({place: transformProfileData(response)}))
    } catch (error) {
      // TODO: treat error correctly
      // log.error('SERVER ERROR', error)
    }

    this.setState(() => ({loadingPlaceDetails: false}))
  }

  loadPlaceFeed = debounce(async nextPage => {
    const {placeId} = this.state
    const {feedPage} = this.state

    const searchPage = nextPage || feedPage

    try {
      const {
        data,
        meta: {total, current_page: currentPage}
      } = await api.index({
        route: `business-feed/${placeId}`,
        query: {
          page: searchPage
        }
      })

      this.setState(({feed}) => ({
        feed: [...feed, ...data],
        feedTotalCount: total,
        feedPage: currentPage
      }))
    } catch (error) {
      // TODO: treat error response correctly
      // log.error('SERVER ERROR', error)
    }
  }, 1000)

  handleLoadMoreFeed = () => {
    const {feed, feedTotalCount, feedPage} = this.state
    const hasMoreItemsToLoad = feed.length < feedTotalCount

    if (!hasMoreItemsToLoad) {
      return
    }

    this.loadPlaceFeed(feedPage + 1)
  }

  reloadPlaceData = () => {
    this.setState(
      () => ({
        place: null,
        loadingPlaceDetails: false,
        feed: [],
        feedTotalCount: 0,
        feedPage: 1
      }),
      this.loadPlaceData
    )
  }
}
