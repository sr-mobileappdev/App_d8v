import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components'
import PropTypes from 'prop-types'

PostPhotoBlock.propTypes = {
  photoUri: PropTypes.string,
  children: PropTypes.any
}

export function PostPhotoBlock ({photoUri, children}) {
  return (
    <PostPhotoContainer>{
      photoUri ? (
        <PhotoBackground source={{uri: photoUri}}>
          <LinearGradient
            style={{flex: 1}}
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
            locations={[0.6, 1]}
          />
        </PhotoBackground>
      ) : (
        <PhotoBackgroundPlaceholder {...{children}} />
      )
    }</PostPhotoContainer>
  )
}

// //
const imagePreviewHeight = 300

const PostPhotoContainer = styled.View`
  flex: 1;
  height: ${imagePreviewHeight};
  max-height: ${imagePreviewHeight};
`
const PhotoBackground = styled.ImageBackground.attrs({resizeMode: 'cover'})`
  flex: 1;
`
const PhotoBackgroundPlaceholder = styled.View`
  background-color: #77e1ff;
  justify-content: center;
  align-items: center;
  flex: 1;
`
