import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native'
import {ThemeProvider} from 'styled-components'
import {Provider} from 'react-redux'
import Config from 'react-native-config'
import SplashScreen from 'react-native-splash-screen'
import axios from 'axios'

import {AppLoading} from 'src/components/AppLoading'
import configureStore from 'src/store/configure'
import NavigationService from 'src/utils/NavigationService'
import Navigator from 'src/router/Navigator'
import {theme} from 'src/theme'
import api from 'src/api'

const store = configureStore()

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class App extends PureComponent {
  /* componentDidMount() {
    NavigationService.navigate('Home')
  } */

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <StatusBar />
            <Navigator
              ref={navigatorRef =>
                NavigationService.setTopLevelNavigator(navigatorRef)
              }
            />
          </>
        </ThemeProvider>
      </Provider>
    )
  }
}

class AppWrapper extends PureComponent {
  state = {loading: true, error: false}

  constructor() {
    super()
    const isAndroid = Platform.OS === 'android'
    if (isAndroid) {
      StatusBar.setTranslucent(true)
      StatusBar.setBackgroundColor('transparent')
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(Config.MANIFEST_SERVER)

      const server = response.data.servers[0]
      api.setUrl(server.url)

      this.setState({loading: false})
    } catch (error) {
      this.setState({error: true, loading: false})
    }

    SplashScreen.hide()
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.center}>
          <Text>Error loading server configuration</Text>
        </View>
      )
    }

    return this.state.loading ? <AppLoading /> : <App />
  }
}

export default AppWrapper
