import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import {connect} from 'react-redux'

import {PlaceReqOwnershipModal} from 'src/containers/PlaceReqOwnership/Modal'
import {Button} from 'src/components/UI/Button'
import {ownershipRequestsSelector} from 'src/containers/PlaceReqOwnership/selectors'
import {ownershipRequestsRequest} from 'src/containers/PlaceReqOwnership/actions'
import {isArray} from 'src/utils/fn'

const mapStateToProps = state => ({
  isFetching: ownershipRequestsSelector(state).isFetching,
  requests: ownershipRequestsSelector(state).requests
})
const mapDispatchToProps = {
  ownershipRequestsRequest
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class PlaceReqOwnershipButton extends React.PureComponent {
  static propTypes = {
    onOwnershipRequested: PropTypes.func,
    place: PropTypes.object
  }
  static defaultProps = {
    onOwnershipRequested: () => {}
  }

  state = {
    modalVisible: false
  }

  componentDidMount () {
    this.props.ownershipRequestsRequest(this.props.place.id)
  }

  showReqOwnershipModal = () => this.setState({modalVisible: true})

  hideReqOwnershipModal = () => this.setState({modalVisible: false})

  render = () => {
    const {
      place,
      onOwnershipRequested,
      style,
      isFetching,
      requests
    } = this.props
    const {modalVisible} = this.state
    const isPending = isArray(requests) && requests.length > 0

    return isPending ? (
      <Button
        as={View}
        isLoading={isFetching}
        style={style}
        fluid
        black
      >
        Request ownership is pending...
      </Button>
    ) : (
      <>
        <Button
          style={style}
          isLoading={isFetching}
          onPress={this.showReqOwnershipModal}
        >
          Request ownership
        </Button>

        <PlaceReqOwnershipModal
          placeId={place.id}
          isVisible={modalVisible}
          onRequestClose={this.hideReqOwnershipModal}
          onOwnershipRequested={onOwnershipRequested}
          autoCloseModalOnSubmit
        />
      </>
    )
  }
}
