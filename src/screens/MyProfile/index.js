import React, {Component} from 'react'
import { debounce } from 'lodash'

import UserProfileDetails from 'src/components/Profile/UserProfile'

import mockData from './mock.json'

export default class MyProfile extends Component {
  state = {
    profile: null,
    feed: [],
    feedTotalCount: 0,
    feedPage: 1
  }

  componentDidMount () {
    this.loadData()
  }

  loadData = () => {
    this.loadProfileData()
    this.loadProfileFeed()
  }

  loadProfileData = () => {
    this.setState({profile: mockData})
  }

  loadProfileFeed = debounce(async (nextPage) => {
    console.log(nextPage)
    // TODO: integrate API
    this.setState({feed: mockData.feed || []})
  }, 1000)

  handleLoadMoreFeed = () => {
    const {feed, feedTotalCount, feedPage} = this.state
    const hasMoreItemsToLoad = feed.length < feedTotalCount

    if (!hasMoreItemsToLoad) {
      return
    }

    this.loadProfileFeed(feedPage + 1)
  }

  render () {
    const {profile, feed} = this.state

    return (
      <UserProfileDetails
        profile={profile}
        feed={feed}
        loadMoreFeed={this.handleLoadMoreFeed}
      />
    )
  }
}
