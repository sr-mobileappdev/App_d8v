import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {MainFont} from 'src/components/Profile/ui'

export class ProfileReviews extends React.PureComponent {
  static propTypes = {
    reviews: PropTypes.array
  }
  state = {
    reviews: []
  }

  render = () => {
    const {reviews} = this.props

    if (reviews.length <= 0) {
      return null
    }

    return (
      <ReviewContainer>
        {reviews.map(this.renderReview)}
      </ReviewContainer>
    )
  }

  renderReview = (review) => {
    if (!review || !review.comment) {
      return null
    }
    const {imageUrl, comment, id} = review

    return (
      <ReviewCard key={id}>
        {
          imageUrl && (
            <ReviewImageContainer
              imageStyle={{borderRadius: 15}}
              source={{uri: imageUrl}}
            >
              <ReviewMessageContainer>
                <ReviewMessage numberOfLines={2}>{comment}</ReviewMessage>
              </ReviewMessageContainer>
            </ReviewImageContainer>
          )
        }
      </ReviewCard>
    )
  }
}

// //
const ReviewCard = styled.View`
  margin-top: 15px;
`

const ReviewImageContainer = styled.ImageBackground.attrs({
  resizeMode: 'cover'
})`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
`

const ReviewContainer = styled.View`
  marginBottom: 30px;
`

const ReviewMessageContainer = styled.View`
  bottom: 0;
  position: absolute;
  padding: 10px;
`

const ReviewMessage = styled(MainFont)`
  color: #FFF;
  flex: 1;
`
