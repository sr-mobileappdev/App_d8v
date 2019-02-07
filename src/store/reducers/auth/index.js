import {combineReducers} from 'redux'

import user from './user'
import jwt from './jwt'

const auth = combineReducers({
  user,
  jwt
})

export default auth
