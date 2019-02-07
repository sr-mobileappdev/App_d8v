import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MapBoxService from 'src/services/MapBoxService'
import StyledText from 'src/components/StyledText'

export default class SectionTitle extends PureComponent {
  static propTypes = {
    location: PropTypes.object
  }
  static defaultProps = {
    location: {lat: 0, lng: 0}
  }

  state = {
    placeName: 'San Francisco'
  }

  componentDidMount () {
    this.decodeLocation()
  }

  render () {
    const {placeName} = this.state

    return (
      <TextContainer>{placeName}</TextContainer>
    )
  }

  decodeLocation = async () => {
    const decodedLocations = await MapBoxService.geodecode(this.props.location)
    const {place_name: placeName} = decodedLocations.features[0] || {}

    this.setState({placeName})
  }
}

const TextContainer = styled(StyledText)`
  font-size: 17px;
  letter-spacing: -0.15px;
  color: #FFF;
`
