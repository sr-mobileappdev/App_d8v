import React, {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ScreenLoader from 'src/components/ScreenLoader'

import withEndReachedScrollView from 'src/components/ScrollViewWithEndReached'
import ProfileTabView from 'src/components/Profile/TabView'

import {ProfileFeed} from '../Feed'
import ProfileTitle from '../ProfileTitle'

const PROFILE_PICTURE_URI = `https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`

const tabItems = {
  profile: 'profile'
}

const routesConfig = {
  profile: {key: tabItems.profile, title: 'Profile'}
}

const getRoutesConfig = () => {
  const routes = [routesConfig.profile]

  return routes
}

export default class UserProfile extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profile) {
      return {
        ...prevState,
        routes: getRoutesConfig(nextProps)
      }
    }

    return null
  }
  static propTypes = {
    profile: PropTypes.object,
    feed: PropTypes.array.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    getUserFeed: PropTypes.func.isRequired
  }

  static defaultProps = {
    loadMoreFeed: () => {}
  }

  state = {
    routes: []
  }

  componentDidMount() {
    this.props.getUserProfile()
    this.props.getUserFeed()
  }

  render() {
    const {profile} = this.props
    const {photo_url: photoUrl} = profile || {}
    const routes = getRoutesConfig(this.props)

    return !profile ? (
      <ScreenLoader />
    ) : (
      <ProfileTabView
        backgroundImage={{uri: photoUrl || PROFILE_PICTURE_URI}}
        renderScene={this.renderScene}
        routes={routes}
      />
    )
  }

  renderScene = ({route}) => {
    const {profile, feed, loadMoreFeed} = this.props

    const {name} = profile || {}

    switch (route.key) {
      case tabItems.profile:
        return (
          <ContentContainer bottomOffset={100} onEndReached={loadMoreFeed}>
            <ProfileTitle title={name || 'John Doe'} offset={200} />

            {feed && !!feed.length && (
              <ProfileFeed data={feed} loadMore={loadMoreFeed} />
            )}
          </ContentContainer>
        )
      default:
        return null
    }
  }
}

const ContentContainer = styled(withEndReachedScrollView(ScrollView))`
  flex: 1;
`
