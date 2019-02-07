export const userProfileLoading = state => state.isFetching
export const userProfileData = state => state.profileData
export const userProfileFeed = state => (state.feedData && state.feedData.feed) || []
