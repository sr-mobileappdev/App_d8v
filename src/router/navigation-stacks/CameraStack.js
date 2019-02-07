import {createStackNavigator} from 'react-navigation'

import defaultStackNavigatorConfig from 'src/router/config'

import PhotoShootScreen from 'src/components/PhotoShoot'

const Stack = createStackNavigator({
  Camera: {screen: PhotoShootScreen}
}, {
  ...defaultStackNavigatorConfig,
  initialRouteName: 'Camera'
})

Stack.navigationOptions = () => ({
  tabBarVisible: false
})

export default Stack
