import {createSwitchNavigator, createAppContainer} from 'react-navigation'

import Welcome from 'src/containers/Welcome'
import BasicAppContainer from 'src/containers/BasicApp'
import {AuthLoading} from 'src/containers/Auth/AuthLoading'

import AuthStack from './navigation-stacks/AuthStack'

const Navigator = createSwitchNavigator(
  {
    Welcome: Welcome,
    AuthLoading: AuthLoading,
    App: BasicAppContainer,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Welcome'
  }
)

export default createAppContainer(Navigator)
