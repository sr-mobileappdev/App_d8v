import {createStackNavigator} from 'react-navigation'

import defaultStackNavigatorConfig from 'src/router/config'

import HomeScreen from 'src/screens/Home'
import {PlaceProfile} from 'src/containers/PlaceProfile'

const Stack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    BusinessProfile: {screen: PlaceProfile}
  },
  {
    ...defaultStackNavigatorConfig,
    initialRouteName: 'Home'
  }
)

Stack.navigationOptions = () => ({})

export default Stack
