import * as React from 'react'
import {TabView} from 'react-native-tab-view'
import ExploreScreen from 'src/screens/Explore'
import HomeSwiper from './HomeSwiper'

class ExploreSwiper extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'HOME_PROFILE'},
      {key: 'EXPLORE'}
    ]
  };

  _handleIndexChange = index => {
    this.setState({
      index
    })
  }

  _renderScene = ({route}) => {
    switch (route.key) {
      case 'HOME_PROFILE':
        return <HomeSwiper index={this.state.index} goToExplore={() => this._handleIndexChange(1)} handleIndexChange={this._handleIndexChange} {...this.props} />
      case 'EXPLORE':
        return <ExploreScreen onBackHome={() => this._handleIndexChange(0)} {...this.props} isFocused />
      default:
        return null
    }
  }

  render() {
    return (
      <TabView
        style={[this.props.style, {flex: 1}]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={() => {}}
        tabBarPosition='top'
        onIndexChange={this._handleIndexChange}
      />
    )
  }
}

export default ExploreSwiper
