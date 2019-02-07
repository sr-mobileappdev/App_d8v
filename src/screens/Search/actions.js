import api from 'src/api'

export const BUSINESSES_REQUESTING_REQUEST = 'BUSINESSES_REQUESTING_REQUEST'
export const BUSINESSES_REQUESTING_SUCCESS = 'BUSINESSES_REQUESTING_SUCCESS'
export const BUSINESSES_REQUESTING_FAILURE = 'BUSINESSES_REQUESTING_FAILURE'

export function searchBusinesses(searchValue, page, coords) {
  return {
    types: [
      BUSINESSES_REQUESTING_REQUEST,
      BUSINESSES_REQUESTING_SUCCESS,
      BUSINESSES_REQUESTING_FAILURE
    ],
    callAPI: () =>
      api.index({
        route: 'businesses',
        query: {
          query: searchValue,
          page,
          ...coords
        }
      })
  }
}

export const SEARCH_UPDATED = 'SEARCH_UPDATED'
export function updateSearchValue(newValue) {
  return {
    type: SEARCH_UPDATED,
    payload: newValue
  }
}

export const SEARCH_BACKED = 'SEARCH_BACKED'
export function backedFromSearch(newValue) {
  return {
    type: SEARCH_BACKED,
    payload: newValue
  }
}
