import create from '../create'

const defaultState = () => ({
  isFetching: false,
  didInvalidate: false,
  expiresIn: 0,
  accessToken: '',
  refreshToken: ''
})

const jwt = create(defaultState(), {
  INVALIDATE_LOGIN: (state) => ({
    ...state,
    didInvalidate: true
  }),
  LOGIN_REQUEST: (state) => ({
    ...state,
    isFetching: true,
    didInvalidate: false
  }),
  LOGIN_SUCCESS: (state, action) => ({
    isFetching: false,
    didInvalidate: false,
    accessToken: action.response.token
  }),
  LOGIN_FAILURE: (state, action) => ({
    ...defaultState(),
    error: action.error
  }),
  CLEAR_TOKEN: () => defaultState()
})

export default jwt
