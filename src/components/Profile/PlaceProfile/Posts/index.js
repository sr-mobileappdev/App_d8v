import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export class ProfilePosts extends PureComponent {
  static propTypes = {
    posts: PropTypes.array
  }
  state = {
    posts: []
  }

  render = () => {
    const {posts} = this.props

    if (posts && posts.length <= 0) {
      return null
    }

    return (
      <Container>
        {posts.map(this.renderPost)}
      </Container>
    )
  }

  renderPost = ({images: [ image ], id}) => {
    return (
      <ImageContainer key={id}>
        <Image
          imageStyle={{borderRadius: 15}}
          source={{uri: image.url}}
        />
      </ImageContainer>
    )
  }
}

// //
const Container = styled.View`
  marginBottom: 30px;
`

const ImageContainer = styled.View`
  margin-top: 15px;
`

const Image = styled.ImageBackground.attrs({
  resizeMode: 'cover'
})`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
`
