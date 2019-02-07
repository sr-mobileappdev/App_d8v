import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components'

import {Dimensions, TouchableWithoutFeedback} from 'react-native'

import ProfilePostModal from 'src/components/Profile/PostModal'

export class ProfilePosts extends Component {
  static propTypes = {
    posts: PropTypes.array
  }
  static defaultProps = {
    posts: []
  }

  state = {
    modalVisible: false,
    post: {}
  }

  render () {
    const {posts, style} = this.props
    const {modalVisible, post} = this.state

    return (
      <PhotosContainer {...{style}}>
        <ProfilePostModal
          isVisible={modalVisible}
          post={post}
          onClose={this.closeModal}
        />
        <Carousel
          data={posts}
          renderItem={({item}) => renderCarouselItem(item, this.openModal)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.9}
          loop
        />
      </PhotosContainer>
    )
  }

  setModalVisible = (visible) => this.setState(() => ({modalVisible: visible}))

  openModal = (post) => this.setState({post}, () => this.setModalVisible(true))

  closeModal = () => this.setModalVisible(false)
}

function renderCarouselItem (item, onPress) {
  const {images} = item

  return (
    <SliderInnerContainer>
      <TouchableWithoutFeedback onPress={() => onPress(item)}>
        <SliderImage source={{uri: images[0].url}} />
      </TouchableWithoutFeedback>
    </SliderInnerContainer>
  )
}

// //
const window = Dimensions.get('window')
const itemHorizontalMargin = 10
const sliderWidth = window.width - itemHorizontalMargin * 2
const itemWidth = sliderWidth * 0.7
const itemHeight = itemWidth
const itemBorderRadius = 8

const PhotosContainer = styled.View`
  margin: 25px 0 0;
`
const SliderInnerContainer = styled.View`
  width: ${itemWidth};
  height: ${itemHeight};
`

const SliderImage = styled.Image`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  resize-mode: cover;
  border-radius: ${itemBorderRadius};
  height: ${itemHeight};
  width: ${itemWidth};
`
