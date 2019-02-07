import {createStackNavigator} from 'react-navigation'

import defaultStackNavigatorConfig from 'src/router/config'

import UserProfileScreen from 'src/containers/UserProfile'
import {PlaceProfile} from '../../containers/PlaceProfile'

const Stack = createStackNavigator(
  {
    UserProfile: {screen: UserProfileScreen},
    BusinessProfile: {screen: PlaceProfile}
  },
  {
    ...defaultStackNavigatorConfig,
    initialRouteName: 'UserProfile'
  }
)

Stack.navigationOptions = () => ({})

export default Stack
