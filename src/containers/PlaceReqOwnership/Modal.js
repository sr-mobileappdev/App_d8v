import React from 'react'
import {Modal} from 'react-native'
import PropTypes from 'prop-types'

import {ModalCloseIcon} from 'src/components/Modal/CloseIcon'
import {PlaceReqOwnership} from 'src/containers/PlaceReqOwnership/index'

PlaceReqOwnershipModal.propTypes = {
  ...PlaceReqOwnership.propTypes,
  onRequestClose: PropTypes.func,
  autoCloseModalOnSubmit: PropTypes.bool,
  isVisible: PropTypes.bool
}

export function PlaceReqOwnershipModal (props) {
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

  const placeReqOwnershipProps = {
    containerStyle,
    sliderStyle,
    size,
    placeId,
    onFeedbackSent
  }

  if (autoCloseModalOnSubmit) {
    placeReqOwnershipProps.onFeedbackSent = (...args) => {
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

      <PlaceReqOwnership {...placeReqOwnershipProps} />
    </Modal>
  )
}
