import {createSelector} from 'reselect'

export const businessSearchSelector = state => state.businessSearch

export const businessSearchValueSelector = createSelector(
  businessSearchSelector,
  ({searchValue}) => searchValue
)

export const businessDataSelector = createSelector(
  businessSearchSelector,
  ({businesses: {data}}) => data
)

export const businessCategoriesDataSelector = createSelector(
  businessSearchSelector,
  ({businesses: {data}}) => {
    const categories = data.reduce(function(accumulator, {categories}) {
      return [...accumulator, ...categories]
    }, [])

    return categories.slice(0, 3)
  }
)

export const businessTotalMetaSelector = createSelector(
  businessSearchSelector,
  ({
    businesses: {
      meta: {total}
    }
  }) => total
)

export const businessCurrentPageMetaSelector = createSelector(
  businessSearchSelector,
  ({
    businesses: {
      meta: {current_page: page}
    }
  }) => page
)

export const businessSearchLoadingStatusSelector = createSelector(
  businessSearchSelector,
  ({requesting}) => {
    return requesting
  }
)
