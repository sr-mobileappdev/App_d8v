import {connect} from 'react-redux'
import {getUserProfile, getUserFeed} from 'src/containers/UserProfile/actions'
import {
  userProfileLoading,
  userProfileData,
  userProfileFeed
} from 'src/containers/UserProfile/selectors'

import UserProfile from 'src/components/Profile/UserProfile'

const mapDispatchToProps = {
  getUserProfile,
  getUserFeed
}

const mapStateToProps = ({userProfile}) => ({
  loading: userProfileLoading(userProfile),
  profile: userProfileData(userProfile),
  feed: userProfileFeed(userProfile)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)
