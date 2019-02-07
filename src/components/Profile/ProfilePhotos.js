import React from 'react'
import Carousel from 'react-native-snap-carousel'
import styled from 'styled-components'

import {Dimensions} from 'react-native'

export function ProfilePhotos ({place, style}) {
  const {images = [], reviews = []} = place
  const reviewWithNoImage = reviews.filter(rev => rev && !rev.image)
  const imagesTakenByReviews = reviewWithNoImage.length
  const imagesLeft = images.slice(imagesTakenByReviews + 1)

  return (imagesLeft.length > 0) && (
    <PhotosContainer {...{style}}>
      <Carousel
        data={imagesLeft}
        renderItem={renderCarouselItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.9}
        loop
      />
    </PhotosContainer>
  )
}

function renderCarouselItem ({item}) {
  return (
    <SliderInnerContainer pointerEvents='box-none'>
      <SliderImage source={{uri: item.url}} />
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
