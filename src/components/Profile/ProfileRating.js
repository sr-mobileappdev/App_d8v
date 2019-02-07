import React from 'react'
import {Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {PlaceReviewModal} from 'src/containers/PlaceReview/Modal'
import StyledText from 'src/components/StyledText'

export class ProfileRating extends React.PureComponent {
  static propTypes = {
    onFeedbackSent: PropTypes.func,
    place: PropTypes.object
  }
  static defaultProps = {
    onFeedbackSent: () => {}
  }

  state = {
    modalVisible: false
  }

  render = () => {
    const {place, onFeedbackSent} = this.props
    const {modalVisible} = this.state

    return (
      <>
        <ReviewButton onPress={this.showReviewModal}>
          <ReviewButtonText>Leave feedback</ReviewButtonText>
        </ReviewButton>

        <PlaceReviewModal
          placeId={place.id}
          isVisible={modalVisible}
          onRequestClose={this.hideReviewModal}
          onFeedbackSent={onFeedbackSent}
          autoCloseModalOnSubmit
        />
      </>
    )
  }

  showReviewModal = () => this.setState({modalVisible: true})

  hideReviewModal = () => this.setState({modalVisible: false})
}

// //
const window = Dimensions.get('window')

const ReviewButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 12px 15px;
  border-radius: 6px;
  background-color: #4ed4fa;
  width: ${window.width / 2}px;
  align-items: center;
  align-self: center;
`
const ReviewButtonText = styled(StyledText)`
  color: #222;
  font-size: 16px;
`
