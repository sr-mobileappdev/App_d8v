import api from 'src/api'

// CONSTANTS

export const TOGGLE_USER_PROFILE_LOADING = 'TOGGLE_USER_PROFILE_LOADING'
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS'
export const GET_USER_PROFILE_ERROR = 'GET_USER_PROFILE_ERROR'
export const GET_USER_FEED_SUCCESS = 'GET_USER_FEED_SUCCESS'
export const GET_USER_FEED_ERROR = 'GET_USER_FEED_ERROR'

// ACTION CREATORS

export const toggleProfileLoading = (loading) => ({
  type: [TOGGLE_USER_PROFILE_LOADING],
  payload: loading
})

export const getUserProfileSuccess = (payload) => ({
  type: [GET_USER_PROFILE_SUCCESS],
  payload
})

export const getUserProfileError = (payload) => ({
  type: [GET_USER_PROFILE_ERROR],
  payload
})

export const getUserFeedSuccess = (payload) => ({
  type: [GET_USER_FEED_SUCCESS],
  payload
})

export const getUserFeedError = (payload) => ({
  type: [GET_USER_FEED_ERROR],
  payload
})

// REQUESTS

const getUserProfileRequest = () => {
  return api.show({
    route: 'user'
  })
}

const getUserFeedRequest = () => {
  return api.index({
    route: 'user-feed'
  })
}

// ACTIONS

export function getUserProfile () {
  return async function (dispatch) {
    dispatch(toggleProfileLoading(true))
    try {
      const response = await getUserProfileRequest()
      dispatch(getUserProfileSuccess(response))
      dispatch(toggleProfileLoading(false))
      return response
    } catch (e) {
      dispatch(toggleProfileLoading(false))
      dispatch(getUserProfileError(e))
    }
  }
}

export function getUserFeed () {
  return async function (dispatch) {
    dispatch(toggleProfileLoading(true))
    try {
      const response = await getUserFeedRequest()
      dispatch(getUserFeedSuccess(response))
      dispatch(toggleProfileLoading(false))
    } catch (e) {
      dispatch(toggleProfileLoading(false))
      dispatch(getUserFeedError(e))
    }
  }
}
