import createReducer from 'src/store/reducers/create'
import {TOGGLE_USER_PROFILE_LOADING, GET_USER_PROFILE_SUCCESS, GET_USER_FEED_SUCCESS} from 'src/containers/UserProfile/actions'

const defaultState = () => ({
  isSuccess: false,
  isFetching: false,
  profileData: {},
  feedData: {}
})

export const userProfile = createReducer(defaultState(), {
  [TOGGLE_USER_PROFILE_LOADING]: (state, {payload}) => ({
    ...state,
    isFetching: payload
  }),
  [GET_USER_PROFILE_SUCCESS]: (state, {payload}) => ({
    ...state,
    profileData: payload
  }),
  [GET_USER_FEED_SUCCESS]: (state, {payload}) => ({
    ...state,
    feedData: payload
  })
})
