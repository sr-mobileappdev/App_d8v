import React from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components'

import {ModalCloseIcon} from 'src/components/Modal/CloseIcon'
import {ModalContainer} from 'src/components/Modal/ModalContainer'

export default function PostModal ({isVisible, post, onClose}) {
  const {images = []} = post

  return (
    <Modal
      style={{margin: 0}}
      animationIn='slideInLeft'
      animationOut='slideOutLeft'
      isVisible={isVisible}
    >
      <ModalContainer>
        <ModalCloseIcon onPress={onClose} />

        <Container>
          {!!images.length && (
            <PhotoBackground source={{uri: images[0].url}} resizeMode='cover' />
          )}
        </Container>
      </ModalContainer>
    </Modal>
  )
}

const Container = styled.View`
  flex: 1;
`

const PhotoBackground = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
`
