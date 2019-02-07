import {createStackNavigator} from 'react-navigation'

import {UserLogin} from '../../containers/Auth/Login'
import {UserRegister} from '../../containers/Auth/Register'
import {RememberPassword} from '../../containers/Auth/RememberPassword'
import {TermsConditions} from '../../containers/Auth/TermsConditions'
import defaultStackNavigatorConfig from '../config'

const AuthStack = createStackNavigator(
  {
    SignIn: UserLogin,
    SignUp: UserRegister,
    RememberPassword: RememberPassword,
    TermsConditions: TermsConditions
  },
  {
    ...defaultStackNavigatorConfig,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      }
    })
  }
)

export default AuthStack
