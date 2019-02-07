import * as React from 'react'
import {View} from 'react-native'
import {TabView} from 'react-native-tab-view'
import HomeScreen from 'src/screens/Home'
import UserProfileScreen from 'src/containers/UserProfile'
import BottomTabBar from 'src/components/BottomTabBar'

const routes = [
  {key: 'USER_PROFILE'},
  {key: 'HOME'}
]

class HomeSwiper extends React.Component {
  state = {
    index: 1,
    routes
  };

  _handleIndexChange = index => {
    this.setState({
      index
    })
  }

  _renderScene = ({route}) => {
    switch (route.key) {
      case 'HOME':
        return <HomeScreen {...this.props} />
      case 'USER_PROFILE':
        return <UserProfileScreen {...this.props} />
      default:
        return null
    }
  }

  getActiveTab = () => {
    const homeIndex = this.state.index
    const exploreIndex = this.props.index
    let activeTab = 'Explore'

    if (exploreIndex === 0) {
      if (homeIndex === 0) { activeTab = 'UserProfile' } else { activeTab = 'Home' }
    }

    return activeTab
  }

  renderBottomBar = () => {
    const props = {
      goToExplore: this.props.goToExplore,
      goToUserProfile: () => this._handleIndexChange(0),
      goToHome: () => this._handleIndexChange(1),
      handleIndexChange: this._handleIndexChange,
      activeTab: this.getActiveTab(),
      ...this.props
    }
    return <BottomTabBar {...props} />
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabView
          style={[this.props.style, {flex: 1}]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={() => {}}
          tabBarPosition='top'
          onIndexChange={this._handleIndexChange}
        />
        {this.renderBottomBar()}
      </View>
    )
  }
}

export default HomeSwiper
