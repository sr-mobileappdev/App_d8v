import React, {PureComponent} from 'react'
import {SafeAreaView} from 'react-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Masonry from 'react-native-masonry-layout'

import api from 'src/api'
import {log} from 'src/utils/fn'
import {geoLocationCoordsSelector} from 'src/components/GeoLocation/selectors'
import withHorizontalSwipeRecognizer from 'src/components/WithSwipeLeftRighRecognizerHOC'

import BrickItem from './components/BrickItem'

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset: {y},
  contentSize
}) => {
  const paddingToBottom = 20
  return layoutMeasurement.height + y >= contentSize.height - paddingToBottom
}

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state)
})

const SwipableMasonry = withHorizontalSwipeRecognizer(Masonry)

@connect(mapStateToProps)
class PlacesBricks extends PureComponent {
  static propTypes = {
    userLocation: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    coords: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    onPlaceSelected: PropTypes.func.isRequired,
    onSwipeLeft: PropTypes.func
  }
  static defaultProps = {
    userLocation: {lat: 0, lng: 0},
    coords: null
  }

  constructor(props) {
    super(props)

    this.items = []
    this.totalItems = -1
    this.page = 1

    this.masonryRef = React.createRef()
  }

  componentDidMount() {
    this.fetchPlaces()
  }

  render() {
    const {style, onSwipeLeft} = this.props

    return (
      <Container style={style}>
        <ContentContainer>
          <SwipableMasonry
            ref={this.masonryRef}
            renderItem={item => <BrickItem {...item} />}
            keyExtractor={({index}) => index}
            columns={2}
            onScroll={this.onMasonryScroll}
            scrollEventThrottle={400}
            onSwipeLeft={onSwipeLeft}
          />
        </ContentContainer>
        <BottomBackgroundContainer />
      </Container>
    )
  }

  onMasonryScroll = ({nativeEvent}) => {
    if (isCloseToBottom(nativeEvent)) {
      this.handleLoadMore()
    }
  }

  fetchPlaces = async nextPage => {
    const {coords, userLocation} = this.props
    const {page = 1} = this

    const queryCoords = coords || userLocation
    const searchPage = nextPage || page

    try {
      const {
        data,
        meta: {total, current_page: currentPage}
      } = await api.index({
        route: 'feed',
        query: {
          page: searchPage,
          ...queryCoords
        }
      })

      this.items = [...this.items, ...data]
      this.totalItems = total
      this.page = currentPage

      const bricksData = this.extractBricksData(data)
      this.masonryRef.current.componentRef.current.addItems(bricksData)
    } catch (error) {
      // TODO: treat error response correctly
      log.error('SERVER ERROR', error)
    }
  }

  handleLoadMore = () => {
    const {items, totalItems, page} = this
    const hasMoreItemsToLoad = items.length < totalItems

    if (!hasMoreItemsToLoad) {
      return
    }

    this.fetchPlaces(page + 1)
  }

  extractBricksData = data => {
    const {onPlaceSelected} = this.props

    const getBrickObject = ({
      images: [image],
      id,
      business_id: businessId,
      business_name: name
    }) => {
      return {
        businessId,
        name,
        index: '' + this.items.length + id,
        uri: image.url,
        height: Math.floor(Math.random() * 125) + 180,
        onPress: onPlaceSelected
      }
    }

    const transformedData = data.map(getBrickObject) || []

    return transformedData
  }
}

const ContentContainer = styled(SafeAreaView)`
  flex: 1;
`

const BottomBackgroundContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 68px;
  background-color: rgba(22, 24, 35, 0.5);
`

const Container = styled.View`
  flex: 1;
  padding: 0 8px;
`

export default PlacesBricks
