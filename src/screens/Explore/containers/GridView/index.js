import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ScrollView} from 'react-native'
import styled from 'styled-components'

import Gallery from './components/Gallery'

import GridViewData from './data/dummy'

export default class GridView extends Component {
  static propTypes = {
    coords: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }
  static defaultProps = {
    coords: {lat: 0, lng: 0}
  }

  render () {
    const itemsCount = GridViewData ? GridViewData.length : 0

    return (
      <Container>
        <ScrollView>
          {GridViewData.map((item, index) => (
            <Gallery images={item} key={item.id} last={index === itemsCount - 1} />
          ))}
        </ScrollView>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  padding-top: 140px;
`
