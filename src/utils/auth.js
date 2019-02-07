import {AsyncStorage} from 'react-native'

import api from 'src/api'

let user = null
const STORAGE_KEY = '$$USER'

export const auth = {
  async bootstrap () {
    return auth.loadUser()
  },

  async loadUser () {
    const savedUser = await AsyncStorage.getItem(STORAGE_KEY) || 'null'
    user = JSON.parse(savedUser)
    api.setToken(auth.getToken())
  },

  async setToken (token) {
    user = {token}
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    api.setToken(token)
  },

  getToken () {
    return user && user.token
  },

  isLoggedIn () {
    return !!auth.getToken()
  },

  logout () {
    auth.setToken(null)
  }
}
