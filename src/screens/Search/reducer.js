import {
  BUSINESSES_REQUESTING_FAILURE,
  BUSINESSES_REQUESTING_SUCCESS,
  BUSINESSES_REQUESTING_REQUEST,
  SEARCH_UPDATED,
  SEARCH_BACKED
} from './actions'

const initialState = {
  searchValue: '',
  businesses: {
    data: [],
    meta: {}
  },
  // categories: [],
  showModal: false,
  requested: false,
  requesting: false,
  error: null
}

export function businessSearch(state = initialState, action) {
  switch (action.type) {
    case BUSINESSES_REQUESTING_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case BUSINESSES_REQUESTING_FAILURE:
      return {
        ...state,
        error: action.payload,
        requested: true,
        requesting: false
      }

    case BUSINESSES_REQUESTING_SUCCESS:
      const {
        response: {meta, data}
      } = action
      const {current_page: page} = meta

      return {
        ...state,
        requested: true,
        requesting: false,
        businesses: {
          data: page === 1 ? data : [...state.businesses.data, ...data],
          meta
        }
      }

    case SEARCH_UPDATED:
      return {
        ...state,
        searchValue: action.payload,
        requesting: true,
        businesses: {
          data: [],
          meta: {}
        }
      }

    case SEARCH_BACKED:
      return {
        ...state,
        searchValue: action.payload,
        requesting: false
      }

    default:
      return state
  }
}
