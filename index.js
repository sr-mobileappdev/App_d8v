/** @format */
import {AppRegistry} from 'react-native'

import {name as appName} from './app.json'
import AppApp from 'src/App'

// this small script gives ability to see network request in debugger
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData

  if (window.__FETCH_SUPPORT__) {
    // it's RNDebugger only to have
    window.__FETCH_SUPPORT__.blob = false
  } else {
    /*
     * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
     * If you're using another way you can just use the native Blob and remove the `else` statement
     */
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob
    global.FileReader = global.originalFileReader
      ? global.originalFileReader
      : global.FileReader
  }
}

console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => AppApp)
