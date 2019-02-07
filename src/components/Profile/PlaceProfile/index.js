/**
 * @format
 * @flow
 */

import React, {PureComponent} from 'react'
import {TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// import ScreenLoader from 'src/components/ScreenLoader'

import SectionContent from 'src/components/Profile/SectionContent'
import HoursRow from './HoursRow'
import Badge from 'src/components/Badge'
import withEndReachedScrollView from 'src/components/ScrollViewWithEndReached'
import ProfileTabView from 'src/components/Profile/TabView'
import StyledText from 'src/components/StyledText'

import CategoriesIcon from './icons/categories.png'
import HoursIcon from './icons/hours.png'

import {ProfileRating} from '../ProfileRating'
import {ProfileReviews} from '../ProfileReviews'
import {ProfilePosts} from './Posts'
import {ProfileFeed} from '../Feed'
import {ProfileCircularProgress} from '../ProfileCircularProgress'
import ProfileTitle from '../ProfileTitle'

import {Images} from 'src/theme'

const tabItems = {
  profile: 'profile',
  posts: 'posts',
  reviews: 'reviews',
  moreInfo: 'more_info'
}

const routesConfig = {
  profile: {key: tabItems.profile, title: 'Profile'},
  posts: {key: tabItems.posts, title: 'Posts'},
  reviews: {key: tabItems.reviews, title: 'Reviews'},
  moreInfo: {key: tabItems.moreInfo, title: 'More Info'}
}

const getRoutesConfig = props => {
  const {profile} = props
  const {posts = [], reviews = []} = profile || {}
  const routes = [routesConfig.profile]

  posts.length > 1 && routes.push(routesConfig.posts)
  reviews.length && routes.push(routesConfig.reviews)
  routes.push(routesConfig.moreInfo)

  return routes
}
const SECTION_BG = 'rgba(22, 24, 35, 0.35)'

const styles = StyleSheet.create({
  contentSection: {
    backgroundColor: SECTION_BG
  }
})

export default class PlaceProfile extends PureComponent {
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
    feed: PropTypes.array.isRequired
  }
  static defaultProps = {}

  state = {
    routes: []
  }

  render() {
    // const {profile} = this.props
    const routes = getRoutesConfig(this.props)

    // let {cover_photo_url: photoUrl} = profile || {}
    // TODO: remove before commit
    // backgroundImage = {uri: photoUrl}
    const backgroundImage = Images.ProfileImage

    // if (!profile) {
    //   return <ScreenLoader />
    // }

    return (
      <ProfileTabView
        withBackButton
        backgroundImage={backgroundImage}
        renderScene={this.renderScene}
        routes={routes}
      />
    )
  }

  renderScene = ({route}) => {
    const {profile, feed, onFeedbackSent, loadMoreFeed} = this.props

    const {categories, name, score, posts = [], reviews = []} = profile || {}

    switch (route.key) {
      case tabItems.profile:
        return (
          <ContentContainer
            bottomOffset={100}
            onEndReached={loadMoreFeed}
            key={route.key}
          >
            <ProfileCircularProgress
              style={{marginTop: 60}}
              {...{rating: score}}
            />
            <ProfileTitle title={name} offset={470} />

            {!!feed.length && (
              <ProfileFeed data={feed} loadMore={loadMoreFeed} />
            )}
          </ContentContainer>
        )
      case tabItems.posts:
        return (
          <SectionContent style={styles.sectionContent} key={route.key}>
            <ProfilePosts posts={posts} />
          </SectionContent>
        )
      case tabItems.reviews:
        return (
          <SectionContent style={styles.sectionContent} key={route.key}>
            <LinksContainer>
              <TouchableOpacity>
                <TextLinkBold>Most recent</TextLinkBold>
              </TouchableOpacity>
              <TouchableOpacity>
                <TextLink>See all</TextLink>
              </TouchableOpacity>
            </LinksContainer>
            <ProfileRating onFeedbackSent={onFeedbackSent} place={profile} />
            <ProfileReviews reviews={reviews} />
          </SectionContent>
        )
      case tabItems.moreInfo:
        return (
          <SectionContent style={styles.sectionContent} key={route.key}>
            <SectionContent title='Categories' titleIcon={CategoriesIcon}>
              <BadgesContainer>
                {categories.map(({name, pivot: {category_id: id}}) => (
                  <Badge
                    style={{marginBottom: 10}}
                    key={id}
                    text={name}
                    color='#F0B218'
                    small
                  />
                ))}
              </BadgesContainer>
            </SectionContent>

            <SectionContent title='Working hours' titleIcon={HoursIcon}>
              <HoursRow day='Monday' hours='09:00am–06:00pm' />
              <HoursRow day='Tuesday' hours='09:00am–06:00pm' />
              <HoursRow day='Wednesday' hours='09:00am–06:00pm' />
              <HoursRow day='Thursday' hours='09:00am–06:00pm' />
              <HoursRow day='Friday' hours='09:00am–06:00pm' />
              <HoursRow day='Saturday' hours='09:00am–06:00pm' />
            </SectionContent>
          </SectionContent>
        )
      default:
        return null
    }
  }
}

const BadgesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const LinksContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`

const TextLink = styled(StyledText)`
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.15px;
  color: #fff;
`

const TextLinkBold = styled(TextLink)`
  font-weight: 700;
`

const ContentContainer = styled(withEndReachedScrollView(ScrollView))`
  flex: 1;
`
