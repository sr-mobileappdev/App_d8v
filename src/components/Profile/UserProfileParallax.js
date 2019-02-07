import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Dimensions} from 'react-native'

import ScreenLoader from 'src/components/ScreenLoader'
import {ParallaxPictureHeader} from 'src/components/ParallaxPictureHeader'
import {ProfileUserDetails} from 'src/components/Profile/ProfileDetails'
import {ProfileReviews} from 'src/components/Profile/ProfileReviews'

export default class UserProfileParallax extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
    profile: PropTypes.object
  }
  static defaultProps = {
    loading: false
  }

  render () {
    const {
      children,
      style,
      loading,
      profile,
      onProfileEdit,
      ...rest
    } = this.props

    const {
      reviews = []
    } = profile

    return (loading || !profile) ? <ScreenLoader /> : (
      <ProfileContainer {...{style}}>
        <ParallaxPictureHeader
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          paddingHorizontal={PADDING_HORIZONTAL}
          paddingVertical={PADDING_VERTICAL + TITLE_HEIGHT + MARGIN_BOTTOM}
          contentBackgroundColor={BG_COLOR}
          headerBackgroundColor={BG_COLOR}
          backgroundColor={BG_COLOR}
          {...rest}
        >
          <ProfileUserDetails user={profile} onProfileEdit={onProfileEdit} />
          <ProfileReviews
            reviews={reviews}
          />
          {children}
        </ParallaxPictureHeader>
      </ProfileContainer>
    )
  }
}

// //
const window = Dimensions.get('window')

const BG_COLOR = '#ffffff'
const PADDING_HORIZONTAL = 20
const PADDING_VERTICAL = 40
const TITLE_HEIGHT = 50
const MARGIN_BOTTOM = 20
const STICKY_HEADER_HEIGHT = 70
const PARALLAX_HEADER_HEIGHT = window.height - PADDING_VERTICAL - TITLE_HEIGHT - MARGIN_BOTTOM

const ProfileContainer = styled.View`
  background-color: ${BG_COLOR};
  flex: 1;
  padding: ${PADDING_VERTICAL / 2}px ${PADDING_HORIZONTAL / 2}px;
`
