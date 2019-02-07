import axios from 'axios'

const api = axios.create({
  timeout: 5000
})

export default class MapBoxService {
  static token = 'pk.eyJ1IjoidGVjaGllZG9kIiwiYSI6ImNqbW5vYWMwZzB3MGQzcWxiYzF3YnpydXEifQ.RNtj2DNEAdFWvRShLmhvGQ'

  static async geodecode ({lat, lng}) {
    const response = await api.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${this.token}`)

    return response
  }
}
