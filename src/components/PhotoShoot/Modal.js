import React from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components'

import {ModalCloseIcon} from 'src/components/Modal/CloseIcon'
import PhotoShoot from 'src/components/PhotoShoot'

export function PhotoShootModal ({onClose, onPictureTaken, isVisible}) {
  return (
    <ModalContainer
      animationIn='slideInUp'
      animationOut='slideOutDown'
      isVisible={isVisible}
      onRequestClose={onClose}
    >
      <ModalCloseIcon onPress={onClose} />

      <PhotoShoot onPictureTaken={onPictureTaken} />
    </ModalContainer>
  )
}

const ModalContainer = styled(Modal)`
  margin: 0;
`
