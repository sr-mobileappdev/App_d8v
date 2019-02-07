import queryString from 'query-string'
import axios from 'axios'

import {log} from 'src/utils/fn'
import {auth} from 'src/utils/auth'
import NavigationService from 'src/utils/NavigationService'

const api = axios.create({
  timeout: 5000
})

class APIProvider {
  constructor () {
    this.url = ''

    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  __makeEndpoint ({route, id, query = {}}) {
    const queryData = queryString.stringify(query)
    let url = `${this.url}/${route}`

    if (id) {
      url += `/${id}`
    }

    if (queryData) {
      url += `?${queryData}`
    }

    return url
  }

  __makeOptions ({method, data}) {
    const options = {
      method,
      headers: this.headers
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    return options
  }

  async __makeCall ({route = '', id, method = 'GET', data, query}) {
    const endpoint = this.__makeEndpoint({route, id, query})
    const options = this.__makeOptions({method, data})

    log.group(`__makeCall ${endpoint}`)
    log.info(options)
    const requestOptions = {
      url: endpoint,
      headers: options.headers,
      method: method
    }
    if (method.toLowerCase() === 'post') {
      requestOptions.data = data || {}
    }

    const response = await api.request(requestOptions)

    log.info({response, json: response.data})
    log.groupEnd(`__makeCall ${endpoint}`)

    if (response.status >= 400) {
      if (response.status === 401) {
        auth.logout()
        this.logout()
        NavigationService.navigate('Auth')
        return {}
      }
    }

    return response.data
  }

  setToken (token) {
    if (!token) {
      return this.logout()
    }

    this.headers.Authorization = `Bearer ${token}`
  }

  setUrl (url) {
    this.url = url
  }

  async login (credentials) {
    const response = await this.create({
      route: 'login',
      data: credentials
    })

    this.setToken(response.token)

    return response
  }

  async logout () {
    delete this.headers.Authorization
  }

  async index ({route, query}) {
    return this.__makeCall({
      route,
      query
    })
  }

  async show ({route, id, query}) {
    return this.__makeCall({
      route,
      id,
      query
    })
  }

  async create ({route, id, data, query}) {
    return this.__makeCall({
      route,
      data,
      query,
      id,
      method: 'POST'
    })
  }

  async update ({route, id, data, query}) {
    return this.__makeCall({
      route,
      id,
      data,
      query,
      method: 'PATCH'
    })
  }

  async destroy ({route, id, query}) {
    return this.__makeCall({
      route,
      id,
      query,
      method: 'DELETE'
    })
  }
}

export default new APIProvider()
