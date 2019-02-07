import createReducer from 'src/store/reducers/create'

const defaultState = () => ({
  isSuccess: false,
  isFetching: false
})

// TODO: it should be mapped by placeId
const ownershipMethods = createReducer(defaultState(), {
  OWNERSHIP_METHOD_REQUEST: (state) => ({
    ...state,
    isSuccess: false,
    isFetching: true
  }),
  OWNERSHIP_METHOD_SUCCESS: (state, action) => ({
    isFetching: false,
    isSuccess: true,
    methods: action.response
  }),
  OWNERSHIP_METHOD_FAILURE: (state, action) => ({
    ...defaultState(),
    error: action.error
  })
})

const ownershipRequests = createReducer(defaultState(), {
  OWNERSHIP_REQUESTS_REQUEST: (state) => ({
    ...state,
    isSuccess: false,
    isFetching: true
  }),
  OWNERSHIP_REQUESTS_SUCCESS: (state, action) => ({
    isFetching: false,
    isSuccess: true,
    requests: action.requests
  }),
  OWNERSHIP_REQUESTS_FAILURE: (state, action) => ({
    ...defaultState(),
    error: action.error
  })
})

const requestOwnership = createReducer(defaultState(), {
  REQUEST_OWNERSHIP_REQUEST: (state) => ({
    ...state,
    isSuccess: false,
    isFetching: true
  }),
  REQUEST_OWNERSHIP_SUCCESS: (state, action) => ({
    isFetching: false,
    isSuccess: true,
    response: action.response
  }),
  REQUEST_OWNERSHIP_FAILURE: (state, action) => ({
    ...defaultState(),
    error: action.error
  })
})

export const placeReaOwnershipReducers = {
  ownershipMethods,
  ownershipRequests,
  requestOwnership
}
