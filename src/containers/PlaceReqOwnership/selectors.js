import {createSelector} from 'reselect'

export const ownershipMethodsSelector = state => state.ownershipMethods
export const requestOwnershipSelector = state => state.requestOwnership
export const ownershipRequestsSelector = state => state.ownershipRequests

export const ownershipMethodsServersSelector = createSelector(ownershipMethodsSelector,
  ownershipMethods => ownershipMethods.methods
)
