import {createStackNavigator} from 'react-navigation'

import defaultStackNavigatorConfig from 'src/router/config'

import ExploreScreen from 'src/screens/Explore'
import {PlaceProfile} from 'src/containers/PlaceProfile'

const Stack = createStackNavigator(
  {
    Explore: {screen: ExploreScreen},
    BusinessProfile: {screen: PlaceProfile}
  },
  {
    ...defaultStackNavigatorConfig,
    initialRouteName: 'Explore'
  }
)

Stack.navigationOptions = () => ({
  tabBarVisible: false
})

export default Stack
