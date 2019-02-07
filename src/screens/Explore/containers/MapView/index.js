import React, {Component} from 'react'
import {Dimensions, Platform} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'

import Carousel from 'react-native-snap-carousel'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import api from 'src/api'

import SliderEntry from 'src/components/SliderEntry'

import {log} from 'src/utils/fn'
import {geoLocationCoordsSelector} from 'src/components/GeoLocation/selectors'

import Annotation, {UserLocationAnnotation} from './components/Annotation'
import TargetActionButton from './components/TargetActionButton'

import SearchHeader from 'src/screens/Search/SearchHeader'
import {businessSearchValueSelector} from 'src/screens/Search/selectors'

import {isIphoneX} from '../../../../utils/isIphoneX'
import {TIMEOUT_MS} from '../../../../utils/common'

const {width} = Dimensions.get('window')
const isIos = Platform.OS === 'ios'
const {geolocation} = navigator

const MAP_MOVE_TO_DURATION = 10

/**
 * Access Token
 */
Mapbox.setAccessToken('pk.eyJ1IjoidGVjaGllZG9kIiwiYSI6ImNqbW5vYWMwZzB3MGQzcWxiYzF3YnpydXEifQ.RNtj2DNEAdFWvRShLmhvGQ')

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state),
  searchValue: businessSearchValueSelector(state)
})

@connect(mapStateToProps)
class MapView extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.coords) {
      return {
        ...prevState,
        mapCoords: nextProps.coords
      }
    }

    return null
  }

  static propTypes = {
    onRegionChange: PropTypes.func,
    openBusinessProfile: PropTypes.func,
    userLocation: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }
  static defaultProps = {
    onRegionChange: () => {},
    userLocation: {lat: 0, lng: 0}
  }

  state = {
    mapCoords: null,
    mapPresets: [],
    mapPresetsTemp: [
      {
        id: undefined,
        title: 'Westside Pub',
        subtitle: 'BARS & CLUBS',
        distance: '2.1mi away',
        imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/watch.png'
      },
      {
        id: undefined,
        title: 'Angel Pub',
        subtitle: 'BARS & CLUBS',
        distance: '2.1mi away',
        imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/watch.png'
      },
      {
        id: undefined,
        title: 'AZ Bar',
        subtitle: 'BARS & CLUBS',
        distance: '2.1mi away',
        imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/watch.png'
      },
      {
        id: undefined,
        title: 'ForU Club',
        subtitle: 'BARS & CLUBS',
        distance: '2.1mi away',
        imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/watch.png'
      }
    ],
    currentMapPresetId: null,
    places: [],
    currentIndex: 0
  }

  constructor (props) {
    super(props)

    this.mapRef = React.createRef()

    if (isIos) {
      geolocation.requestAuthorization()
    }
	this._lastTime = 0
    this._previousTimerId = -1
  }

  __onRegionDidChange = mapData => {
    if (mapData) {
      const {coordinates} = mapData.geometry
      const [lng, lat] = coordinates

      this.setState({mapCoords: {lat, lng}}, this.__fetchPlaces)

      this.props.onRegionChange({lat, lng})
    }
  }

  __resetLocation = () => {
    const {userLocation} = this.props

    const {lat, lng} = userLocation

    this.mapRef.current.moveTo([lng, lat], MAP_MOVE_TO_DURATION)
  }

  __fetchPlaces = () => {
    const {userLocation} = this.props
    const {mapCoords, currentMapPresetId} = this.state
    const coords = mapCoords || userLocation

    try {
      const query = {
        ...coords
      }

      if (currentMapPresetId) {
        query.map_preset_id = currentMapPresetId
      }

      api.index({
        route: 'businesses',
        query
      }).then(response => {
		  if (!response || !Array.isArray(response.data)) {
			return
		  }

		  response.data.map(item => {
			item.type = Math.floor(Math.random() * 3)
		  })

		  this.setState({places: response.data})
	  })
    } catch (error) {
      // TODO: handle error correctly
      log.error('SERVER ERROR', error)
    }
  }

  __fetchMapPresets = async () => {
    try {
      const response = await api.index({
        route: 'map-presets'
      })

      if (!response || !Array.isArray(response.data)) {
        return
      }

      this.setState({
        mapPresets: [{
          id: undefined,
          name: 'All'
        }].concat(response.data)
      })
    } catch (error) {
      log.error('SERVER ERROR', error)
    }
  }

  componentDidMount () {
    this.__fetchPlaces()
    this.__fetchMapPresets()
  }

  renderAnnotations = () => {
    return this.state.places.map(({id, name, lat, lng, type}) => {
      return (
        <Mapbox.PointAnnotation
          id={`${id}`}
          key={`${id}`}
          coordinate={[lng, lat]}
          title={name}
        >
          <Annotation type={type} onPress={() => this.props.openBusinessProfile(id)} />
        </Mapbox.PointAnnotation>
      )
    })
  }

  renderUserLocationAnnotation = (lng, lat) => (
    <Mapbox.PointAnnotation
      coordinate={[lng, lat]}
      title={'user location'}
      id='user_location_annotation'
    >
      <UserLocationAnnotation onPress={() => {}} />
    </Mapbox.PointAnnotation>
  )

  __changeCurrentMapPreset = ({id}) => {
    const currentTime = (new Date()).getTime()
    const diff = currentTime - this._lastTime
    if (diff < TIMEOUT_MS) {
      clearTimeout(this._previousTimerId)
    }
    this._previousTimerId = setTimeout(() => {
      this.setState({currentMapPresetId: id}, this.__fetchPlaces)
    }, TIMEOUT_MS)
    this._lastTime = (new Date()).getTime()
  }

  __onCarouselItemChanged = (slideIndex) => {
    // const {id} = this.state.mapPresets[slideIndex]
    const {id} = this.state.mapPresetsTemp[slideIndex]
    this.setState({currentIndex: slideIndex})

    this.__changeCurrentMapPreset({id})
  }

  onBackPress = () => {
    this.props.onBackHome()
  }

  render () {
    // const {mapPresets} = this.state
    const {mapPresetsTemp} = this.state
    const {userLocation, coords, openBusinessSearchModal} = this.props
    const {lat, lng} = userLocation // starting to show map from user location
    return (
      <Container>
        <MapboxContainer
          ref={this.mapRef}
          key='mapbox'
          zoomLevel={1}
          centerCoordinate={[lng, lat]} // mapbox don't need current coords unlike airbnb maps
          showUserLocation={false}
          logoEnabled={false}
          compassDisabled
          pitchEnabled={false}
          onRegionDidChange={this.__onRegionDidChange}
        >
          {this.renderAnnotations()}
          {this.renderUserLocationAnnotation(lng, lat)}
        </MapboxContainer>

        <ContentContainer pointerEvents='box-none'>
          <SearchHeader
            onBackPress={this.onBackPress}
            onFocus={openBusinessSearchModal}
            coords={coords}
            blurOnFocus
            withBlur
            isFocused={this.props.isFocused}
            withBack
            editable={false}
          />

          <TargetActionButton onPress={this.__resetLocation} />
          <CarouselContainer>
            <Carousel
              data={mapPresetsTemp}
              renderItem={({item, index}) => (
                <SliderEntry
                  data={item}
                  key={index}
                  active={index === this.state.currentIndex}
                  onPress={this.__changeCurrentMapPreset}
                />
              )}
              onSnapToItem={this.__onCarouselItemChanged}
              sliderWidth={width}
              itemWidth={width * 0.9}
              firstItem={0}
              inactiveSlideScale={1}
              activeSlideAlignment='center'
              inactiveSlideOpacity={1}
            />
          </CarouselContainer>
        </ContentContainer>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
`

const MapboxContainer = styled(Mapbox.MapView)`
  flex: 1;
`

const ContentContainer = styled.View`
  width: ${width};
  top: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  zIndex: 2;
`

const bottomCarousel = isIphoneX() ? 79 : 59

const CarouselContainer = styled.View`
  position: absolute;
  padding-horizontal: 0;
  bottom: ${bottomCarousel}px; 
`

export default MapView
