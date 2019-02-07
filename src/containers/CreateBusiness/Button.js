import React from 'react'
import PropTypes from 'prop-types'
import {CreateBusinessModal} from 'src/containers/CreateBusiness/Modal'
import {Button} from 'src/components/UI/Button'

export class CreateBusinessButton extends React.PureComponent {
  static propTypes = {
    onBusinessCreated: PropTypes.func
  }

  static defaultProps = {
    onBusinessCreated: () => {}
  }

  state = {
    isVisibleCreateBusinessModal: false
  }

  onBusinessCreated = async business => {
    const {onBusinessCreated} = this.props

    this.closeCreateBusinessModal()
    onBusinessCreated(business)
  }

  showCreateBusinessModal = () => {
    this.setState({isVisibleCreateBusinessModal: true})
  }

  closeCreateBusinessModal = () => {
    this.setState({isVisibleCreateBusinessModal: false})
  }

  render () {
    return (
      <>
        <Button
          style={{
            alignSelf: 'center',
            marginTop: 20
          }}
          onPress={this.showCreateBusinessModal}
        >
          Create Business
        </Button>

        <CreateBusinessModal
          isVisible={this.state.isVisibleCreateBusinessModal}
          onRequestClose={this.closeCreateBusinessModal}
          onBusinessCreated={this.onBusinessCreated}
        />
      </>
    )
  }
}
