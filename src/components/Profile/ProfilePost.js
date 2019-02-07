import React from 'react'
import {
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {CreatePostModal} from 'src/containers/CreatePost/Modal'
import StyledText from 'src/components/StyledText'

export class ProfilePost extends React.PureComponent {
  static propTypes = {
    onPostSent: PropTypes.func,
    place: PropTypes.object
  }
  static defaultProps = {
    onPostSent: () => {}
  }

  state = {
    modalVisible: false
  }

  render = () => {
    const {place, onPostSent} = this.props
    const {modalVisible} = this.state

    return (
      <>
        <PostButton onPress={this.showPostModal}>
          <PostButtonText>Create Post</PostButtonText>
        </PostButton>

        <CreatePostModal
          placeId={place.id}
          isVisible={modalVisible}
          onRequestClose={this.hidePostModal}
          onPostSent={onPostSent}
          autoCloseModalOnSubmit
        />
      </>
    )
  }

  showPostModal = () => this.setState({modalVisible: true})

  hidePostModal = () => this.setState({modalVisible: false})
}

// //
const window = Dimensions.get('window')

const PostButton = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px 15px;
  border-radius: 6px;
  background-color: #4ed4fa;
  width: ${window.width / 2}px;
  align-items: center;
  align-self: center;
`
const PostButtonText = styled(StyledText)`
  color: #222;
  font-size: 16px;
`
