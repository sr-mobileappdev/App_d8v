import api from 'src/api'

export function ownershipMethodRequest (id) {
  return {
    types: ['OWNERSHIP_METHOD_REQUEST', 'OWNERSHIP_METHOD_SUCCESS', 'OWNERSHIP_METHOD_FAILURE'],
    callAPI: () => api.show({
      route: 'ownership-methods',
      id
    })
  }
}

export function ownershipRequestsRequest (id) {
  return {
    types: ['OWNERSHIP_REQUESTS_REQUEST', 'OWNERSHIP_REQUESTS_SUCCESS', 'OWNERSHIP_REQUESTS_FAILURE'],
    callAPI: () => api.show({
      route: 'ownership-requests',
      id
    })
  }
}

export function requestOwnershipRequest (id, data) {
  return {
    types: ['REQUEST_OWNERSHIP_REQUEST', 'REQUEST_OWNERSHIP_SUCCESS', 'REQUEST_OWNERSHIP_FAILURE'],
    callAPI: () => api.create({
      route: 'ownership-requests',
      id,
      data
    })
  }
}

export function confirmOwnershipRequest (id, data) {
  return {
    types: ['CONFIRM_OWNERSHIP_CONFIRM', 'CONFIRM_OWNERSHIP_SUCCESS', 'CONFIRM_OWNERSHIP_FAILURE'],
    callAPI: () => api.create({
      route: 'confirm-ownership',
      id,
      data
    })
  }
}
