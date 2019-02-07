import React from 'react'
import {Modal} from 'react-native'
import PropTypes from 'prop-types'

import {ModalCloseIcon} from 'src/components/Modal/CloseIcon'
import {CreatePost} from 'src/containers/CreatePost/index'

CreatePostModal.propTypes = {
  ...CreatePost.propTypes,
  onRequestClose: PropTypes.func,
  autoCloseModalOnSubmit: PropTypes.bool,
  isVisible: PropTypes.bool
}

export function CreatePostModal (props) {
  const {
    containerStyle,
    datepickerStyle,
    size,
    placeId,
    onPostSent,
    onRequestClose,
    autoCloseModalOnSubmit,
    isVisible
  } = props

  const createPostProps = {
    containerStyle,
    datepickerStyle,
    size,
    placeId,
    onPostSent
  }

  if (autoCloseModalOnSubmit) {
    createPostProps.onPostSent = (...args) => {
      onPostSent(...args)
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

      <CreatePost {...createPostProps} />
    </Modal>
  )
}
