import React from 'react'
import {Modal} from 'react-native'
import PropTypes from 'prop-types'

import {ModalCloseIcon} from 'src/components/Modal/CloseIcon'
import {PlaceReview} from 'src/containers/PlaceReview/index'

PlaceReviewModal.propTypes = {
  ...PlaceReview.propTypes,
  onRequestClose: PropTypes.func,
  autoCloseModalOnSubmit: PropTypes.bool,
  isVisible: PropTypes.bool
}

export function PlaceReviewModal (props) {
  const {
    containerStyle,
    sliderStyle,
    size,
    placeId,
    onFeedbackSent,
    onRequestClose,
    autoCloseModalOnSubmit,
    isVisible
  } = props

  const placeReviewProps = {
    containerStyle,
    sliderStyle,
    size,
    placeId,
    onFeedbackSent
  }

  if (autoCloseModalOnSubmit) {
    placeReviewProps.onFeedbackSent = (...args) => {
      onFeedbackSent(...args)
      onRequestClose()
    }
  }

  return (
    <Modal
      animationIn='zoomInDown'
      animationOut='zoomOutUp'
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <ModalCloseIcon onPress={onRequestClose} />

      <PlaceReview {...placeReviewProps} />
    </Modal>
  )
}
