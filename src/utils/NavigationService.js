import {NavigationActions, StackActions} from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

function goBack() {
  _navigator.dispatch(StackActions.pop({n: 1}))
}

function navigateToBusinessProfile(params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: 'Home',
      action: StackActions.push({routeName: 'BusinessProfile', params})
    })
  )
}

export default {
  navigate,
  setTopLevelNavigator,
  navigateToBusinessProfile,
  goBack
}
