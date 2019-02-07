import React, {Component} from 'react'

export default function withEndReachedScrollView(WrappedComponent) {
  class ScrollViewWithEndReached extends Component {
    render() {
      return <WrappedComponent onScroll={this.onScroll} {...this.props} />
    }

    isCloseToBottom = ({
      layoutMeasurement,
      contentOffset: {y},
      contentSize
    }) => {
      const {bottomOffset = 80} = this.props

      return layoutMeasurement.height + y >= contentSize.height - bottomOffset
    }

    onScroll = ({nativeEvent}) => {
      if (this.isCloseToBottom(nativeEvent)) {
        this.props.onEndReached()
      }
    }
  }

  ScrollViewWithEndReached.displayName = `withHorizontalSwipeRecognizer(${WrappedComponent.displayName ||
    WrappedComponent.name})`

  ScrollViewWithEndReached.navigationOptions =
    WrappedComponent.navigationOptions

  return ScrollViewWithEndReached
}
