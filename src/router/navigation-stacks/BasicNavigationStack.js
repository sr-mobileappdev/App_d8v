import {Easing, Animated} from 'react-native'

import {createStackNavigator} from 'react-navigation'
import defaultStackNavigatorConfig from 'src/router/config'
import {PlaceProfile} from '../../containers/PlaceProfile'

import SearchStack from './SearchStack'
import CameraStack from './CameraStack'
import fade from '../../utils/fade-transition'
import ExploreSwiper from './ExploreSwiper'

const BasicNavigationStack = createStackNavigator(
  {
    Home: ExploreSwiper,
    BusinessProfile: {screen: PlaceProfile}
  },
  {
    ...defaultStackNavigatorConfig,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    initialRouteName: 'Home'
  }
)

const RootStack = createStackNavigator(
  {
    Main: BasicNavigationStack,
    Search: SearchStack,
    Camera: CameraStack
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Main',
    transitionConfig: (toTransitionProps, fromTransitionProps) => {
      return {
        containerStyle: {
          backgroundColor: '#FFF'
        },
        transitionSpec: {
          duration: 150,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true
        },
        screenInterpolator: sceneProps => {
          const {position, layout, scene} = sceneProps

          const {routeName} = scene.route
          if (['Search'].includes(routeName)) return fade(sceneProps)

          const thisSceneIndex = scene.index
          const height = layout.initHeight

          const translateY = position.interpolate({
            inputRange: [
              thisSceneIndex - 1,
              thisSceneIndex,
              thisSceneIndex + 1
            ],
            outputRange: [height, 0, 0]
          })
          return {transform: [{translateY}]}
        }
      }
    }
  }
)

export default RootStack
