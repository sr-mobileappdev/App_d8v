import {combineReducers} from 'redux'

import {AppReducers} from 'src/reducers'

import auth from './auth/index'

const appApp = combineReducers({
  auth,
  ...AppReducers
})

export default appApp
