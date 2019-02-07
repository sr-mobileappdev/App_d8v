import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import autobind from 'autobind-decorator'
import HomeCard from 'src/components/HomeCard'
import {moderateScale} from 'src/utils/scaling'
import {theme} from 'src/theme'
// import PlacesBricks from 'src/containers/PlacesBricks'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  activityIndicatorContainer: {
    height: moderateScale(70),
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const defaultCards = [
  {
    id: Math.random() * 1000000,
    author: {
      id: Math.random() * 1000,
      photoUrl: 'https://i.imgur.com/BU6IIVY.jpg',
      fullName: 'Dean Michel'
    },
    place: 'Fresh Joe Bar',
    backgroundUrl: 'https://i.imgur.com/4oWNlQ9.jpg',
    totalSympathy: 300000,
    totalComments: 653,
    onlyBussness: true
  },
  {
    id: Math.random() * 1000000,
    author: {
      id: Math.random() * 1000,
      photoUrl: 'https://i.imgur.com/oKBikhU.jpg',
      fullName: 'Sarah Lacy'
    },
    place: 'Fresh Joe Bar',
    backgroundUrl: 'https://i.imgur.com/ZDNzpnI.jpg',
    totalSympathy: 250000,
    totalComments: 253,
    onlyBussness: false
  }
]

const defaultStateCards = Array.from({length: 20}).map(
  () => defaultCards[Math.round(Math.random())]
)
export default class Home extends Component {
  state = {
    selected: new Map(),
    refreshing: false,
    loadingMore: false,
    cards: defaultStateCards
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content')
  }

  loadMoreTimeout = null

  componentWillUnmount() {
    clearTimeout(this.loadMoreTimeout)
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={this.state.cards}
            renderItem={this.renderCard}
            keyExtractor={this._keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            ListFooterComponent={this.renderFooter}
            onEndReached={() => {
              this.setState({loadingMore: true})

              this.loadMoreTimeout = setTimeout(() => {
                this.setState({
                  loadingMore: false,
                  cards: [
                    ...this.state.cards,
                    ...Array.from({length: 10}).map(
                      () => defaultCards[Math.round(Math.random())]
                    )
                  ]
                })
              }, 1000)
            }}
            contentContainerStyle={theme.handlingNotchAndroid}
          />
          {/* <PlacesBricks
          onPlaceSelected={this.onPlaceSelected}
          onSwipeLeft={this.openExploreScreen}
        /> */}
        </SafeAreaView>
      </View>
    )
  }

  @autobind
  renderCard(data) {
    return <HomeCard {...data.item} onPressCard={this.onPressCard} />
  }

  @autobind
  onPressCard() {
    this.props.navigation.navigate('BusinessProfile')
  }

  @autobind
  _keyExtractor(item, index) {
    return index.toString()
  }

  @autobind
  onRefresh() {
    this.setState(() => ({refreshing: true}))

    setTimeout(() => {
      this.setState(() => ({refreshing: false, cards: defaultStateCards}))
    }, 3000)
  }

  @autobind
  renderFooter() {
    if (!this.state.loadingMore) return null

    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  onPlaceSelected = placeId => {
    this.props.navigation.navigate('BusinessProfile', {placeId})
  }

  openExploreScreen = () => {
    this.props.navigation.navigate('Explore')
  }
}
