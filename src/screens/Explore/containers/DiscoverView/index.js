import React, {Component} from 'react'
import PropTypes from 'prop-types'

import PullUpContainer from 'src/components/PullUpContainer'
import BottomDrawer from './components/BottomDrawer'
import DiscoverExpandedContent from './components/ExpandedContent'

export default class Explore extends Component {
  static propTypes = {
    coords: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    openBusinessSearchModal: PropTypes.func,
    openBusinessProfile: PropTypes.func
  }
  static defaultProps = {
    coords: {lat: 0, lng: 0}
  }

  constructor (props) {
    super(props)

    this.pullUpRef = React.createRef()
  }

  getExpandedContent = () => {
    const {coords, openBusinessSearchModal, openBusinessProfile} = this.props

    return (
      <DiscoverExpandedContent
        coords={coords}
        openBusinessSearchModal={openBusinessSearchModal}
        openBusinessProfile={openBusinessProfile}
      />
    )
  }

  onCloseDiscover = () => {
    this.pullUpRef.current.showCollapsed()
  }

  render () {
    return (
      <PullUpContainer
        ref={this.pullUpRef}
        itemCollapsed={<BottomDrawer />}
        itemExpanded={this.getExpandedContent()}
      />
    )
  }
}
