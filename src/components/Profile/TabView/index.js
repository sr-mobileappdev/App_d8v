/**
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {Animated, View, StyleSheet, Dimensions, Platform, Switch, AsyncStorage, SafeAreaView} from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
// import {HeaderBackButton, SafeAreaView} from 'react-navigation'

import Text from 'src/components/Text'
import AnimatedBackground from 'src/components/Profile/AnimatedBackground'
import ScrollableTabBar from './ScrollableTabBar'
import ScrollableTabView from './ScrollableTabView'

import ProfileScene from '../ProfileScene'

const screenHeight = Dimensions.get('window').height

/*
const chatIcon = require('src/assets/icons/Icon-Comment.png')
const likeIcon = require('src/assets/icons/Icon-Like.png')
*/

const styles = StyleSheet.create({
  page: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  welcome: {
    paddingTop: 40,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
  },
  tabBarStyle: {
    marginRight: 20
  },
  avatarContainer: {
    flex: 0.3
  },
  coverPhotoGradient: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%'
  },
  spaceContainer: {
    flex: 0.7
  },
  bottomAlignWrapper: {

  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})

const routes = [
  {
    key: 'profile',
    title: 'Profile'
  },
  {
    key: 'stats',
    title: 'Stats'
  },
  {
    key: 'info',
    title: 'Info'
  },
  {
    key: 'nostra',
    title: 'Nostra'
  },
  {
    key: 'more-info',
    title: 'More info'
  }
]
export default class ProfileTabView extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.routes) {
      return {
        ...prevState,
        routes: nextProps.routes
      }
    }

    return null
  }

  static propTypes = {
    withBackButton: PropTypes.bool
  }
  static defaultProps = {
    withBackButton: false
  }
  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0,
      routes: [],
      index: 0,
      welcomeDisp: false,
      scrollValue: new Animated.Value(0),
      timer: null,
      whiteToBlack: 0
    }

    this.scrollableTabView = React.createRef()
    this.renderScene = this.renderScene.bind(this)
  }

  async componentDidMount() {
    var value = false
    try {
      var strValue = await AsyncStorage.getItem('skip_welcome_display')
      strValue && (value = strValue.toLowerCase() === 'true')
    } catch (error) {
      console.log('error reading in profile setting : ' + error)
      value = false
    }

    this.setState({welcomeDisp: value})
  }

  render() {
    const {backgroundImage} = this.props

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fafafa'}}>

        <ScrollableTabView
          locked={this.state.showTooltip}
          ref={ref => { this.scrollableTabView = ref }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar style={styles.tabBarStyle} whiteToBlack={this.state.whiteToBlack} scrollEnabled={!this.state.showTooltip} />}
          withBackButton={this.props.withBackButton}
          renderAnimatedBackground={() => (
            <AnimatedBackground backgroundImage={backgroundImage} />
          )}
          style={{flex: 1}}
        >

          {routes.map(route => (
            <View tabLabel={route.title} key={route.key} style={{flex: 1}}>
              {this.renderScene(route)}
            </View>
          ))}
        </ScrollableTabView>

      </SafeAreaView>
    )
  }

  toggleWelcomeDisplay = async () => {
    var welcomeDisp = !this.state.welcomeDisp
    try {
      await AsyncStorage.setItem('skip_welcome_display', welcomeDisp.toString())
    } catch (error) {
      console.log('error writing in profile setting : ' + error)
    }

    this.setState({welcomeDisp})
  }

  handleScroll = (event) => {
    const whiteArea = screenHeight / 7 * 5
    if (event.nativeEvent.contentOffset.y < whiteArea) {
      this.setState({whiteToBlack: event.nativeEvent.contentOffset.y / whiteArea})
    } else {
      this.setState({whiteToBlack: 1})
    }
  }

  renderScene({key, title}) {
    if (key === 'profile') {
      return (
        <View style={{flex: 1}}>

          {this.state.whiteToBlack > 0 &&
            <LinearGradient
              locations={[0, 1]}
              colors={[
                'rgba(0, 0, 0, ' + this.state.whiteToBlack * 1.5 + ')',
                'rgba(0, 0, 0, ' + this.state.whiteToBlack * 1.5 + ')'
              ]}
              style={styles.coverPhotoGradient}
            />}

          <ProfileScene handleScroll={this.handleScroll} backgroundImage={this.props.backgroundImage} />

        </View>
      )
    } else {
      return (
        <View style={styles.page}>
          <View style={styles.pageTop} />
          <View style={styles.pageBottom}>
            <Text style={styles.welcome}>Screen {title}</Text>
            <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>
              {Platform.select({
                ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
                android:
                  'Press double R to reload,\n' +
                  'Shake or press menu button for dev menu'
              })}
            </Text>
            <Text style={styles.instructions}>Skip Display Welcome Screen</Text>
            <Switch
              style={{height: 20, width: 100}}
              value={this.state.welcomeDisp}
              onValueChange={this.toggleWelcomeDisplay} />
          </View>
        </View>
      )
    }
  }
}

