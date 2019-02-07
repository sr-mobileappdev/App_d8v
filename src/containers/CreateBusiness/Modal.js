import React from 'react'
import {Modal} from 'react-native'
import PropTypes from 'prop-types'

import {ModalCloseIcon} from 'src/components/Modal/CloseIcon'
import {CreateBusiness} from 'src/containers/CreateBusiness'

CreateBusinessModal.propTypes = {
  onBusinessCreated: PropTypes.func,
  onRequestClose: PropTypes.func,
  autoCloseModalOnSubmit: PropTypes.bool,
  isVisible: PropTypes.bool
}

export function CreateBusinessModal (props) {
  const {
    containerStyle,
    onBusinessCreated,
    onRequestClose,
    autoCloseModalOnSubmit,
    isVisible
  } = props

  const createBusinessProps = {
    containerStyle,
    onBusinessCreated
  }

  if (autoCloseModalOnSubmit) {
    createBusinessProps.onBusinessCreated = (...args) => {
      onBusinessCreated(...args)
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

      <CreateBusiness onCreateBusiness={onBusinessCreated} />
    </Modal>
  )
}
