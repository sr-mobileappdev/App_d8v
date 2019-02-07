import {createStackNavigator} from 'react-navigation'

import defaultStackNavigatorConfig from 'src/router/config'

import Screen from 'src/screens/Search'
import {PlaceProfile} from 'src/containers/PlaceProfile'

const Stack = createStackNavigator(
  {
    Search: {screen: Screen},
    BusinessProfile: {screen: PlaceProfile}
  },
  {
    ...defaultStackNavigatorConfig,
    initialRouteName: 'Search'
  }
)

Stack.navigationOptions = () => ({})

export default Stack
