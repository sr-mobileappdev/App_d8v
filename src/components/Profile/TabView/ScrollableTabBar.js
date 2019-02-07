// @flow
// extended from
// https://github.com/ptomasroos/react-native-scrollable-tab-view/blob/master/ScrollableTabBar.js
import React, {PureComponent} from 'react'
import {HeaderBackButton} from 'react-navigation'
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

import NavigationService from 'src/utils/NavigationService'

const WINDOW_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  tab: {
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  tabUnderlineStyle: {
    position: 'absolute',
    height: 38,
    bottom: 5,
    borderRadius: 20
  },
  container: {
    height: 50,
    flexDirection: 'row'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

class ScrollableTabBar extends PureComponent {
  static defaultProps = {
    scrollOffset: 52,
    activeTextColor: '#fff',
    inactiveTextColor: '#fff',
    backgroundColor: null,
    style: {},
    tabStyle: {},
    tabsContainerStyle: {},
    underlineStyle: {}
  }

  state = {
    _leftTabUnderline: new Animated.Value(0),
    _widthTabUnderline: new Animated.Value(0),
    _containerWidth: null
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView)
  }

  componentWillReceiveProps(nextProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (
      JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) &&
      this.state._containerWidth
    ) {
      this.setState({_containerWidth: null})
    }
  }

  render() {
    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline
    }
	const tintColor = this.props.whiteToBlack > 0.6 ? 0
		  : this.props.whiteToBlack < 0.4 ? 255
		  : (0.6 - this.props.whiteToBlack) / 0.2 * 255

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: 'rgba(255, 255, 255, ' + this.props.whiteToBlack + ')', width: '100%'},
          this.props.style
        ]}
        onLayout={this.onContainerLayout}
      >
        {this.props.withBackButton && (
          <HeaderBackButton
            onPress={NavigationService.goBack}
			tintColor={'rgba(' + tintColor + ',' + tintColor + ',' + tintColor + ', 1)'}
          />
        )}
        <ScrollView
          ref={scrollView => {
            this._scrollView = scrollView
          }}
		  scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled
          bounces={false}
          scrollsToTop={false}
        >
          <View
            style={[
              styles.tabs,
              {width: this.state._containerWidth},
              this.props.tabsContainerStyle
            ]}
            ref={'tabContainer'}
            onLayout={this.onTabContainerLayout}
          >

		<Animated.View
              style={[
                styles.tabUnderlineStyle,
                {backgroundColor: 'rgba(' + tintColor + ',' + tintColor + ',' + tintColor + ', 1)'},
                dynamicTabUnderline,
                this.props.underlineStyle
              ]}
            />


            {this.props.tabs.map((name, page) => {
              const isTabActive = this.props.activeTab === page
              const renderTab = this.props.renderTab || this.renderTab
              return renderTab(
                name,
                page,
                isTabActive,
                this.props.goToPage,
                this.measureTab.bind(this, page)
              )
            })}
          </View>
        </ScrollView>
      </View>
    )
  }

  @autobind
  updateView(offset) {
    const position = Math.floor(offset.value)
    const pageOffset = offset.value % 1
    const tabCount = this.props.tabs.length
    const lastTabPosition = tabCount - 1

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return
    }

    if (
      this.necessarilyMeasurementsCompleted(
        position,
        position === lastTabPosition
      )
    ) {
      this.updateTabPanel(position, pageOffset)
      this.updateTabUnderline(position, pageOffset, tabCount)
    }
  }

  @autobind
  necessarilyMeasurementsCompleted(position, isLastTab) {
    return (
      this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements
    )
  }

  @autobind
  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width
    const tabWidth = this._tabsMeasurements[position].width
    const nextTabMeasurements = this._tabsMeasurements[position + 1]
    const nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0
    const tabOffset = this._tabsMeasurements[position].left
    const absolutePageOffset = pageOffset * tabWidth
    let newScrollX = tabOffset + absolutePageOffset

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -=
      (containerWidth -
        (1 - pageOffset) * tabWidth -
        pageOffset * nextTabWidth) /
      2
    newScrollX = newScrollX >= 0 ? newScrollX : 0

    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false})
    } else {
      const rightBoundScroll =
        this._tabContainerMeasurements.width - this._containerMeasurements.width
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false})
    }
  }

  @autobind
  updateTabUnderline(position, pageOffset, tabCount) {
    const lineLeft = this._tabsMeasurements[position].left
    const lineRight = this._tabsMeasurements[position].right

    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left
      const nextTabRight = this._tabsMeasurements[position + 1].right

      const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft
      const newLineRight =
        pageOffset * nextTabRight + (1 - pageOffset) * lineRight

      this.state._leftTabUnderline.setValue(newLineLeft)
      this.state._widthTabUnderline.setValue(newLineRight - newLineLeft)
    } else {
      this.state._leftTabUnderline.setValue(lineLeft)
      this.state._widthTabUnderline.setValue(lineRight - lineLeft)
    }
  }

  @autobind
  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const {textStyle} = this.props
    const inactiveText = this.props.whiteToBlack > 0.6 ? 0
      : this.props.whiteToBlack < 0.4 ? 255
        : (0.6 - this.props.whiteToBlack) / 0.2 * 255
    const activeText = 255 - inactiveText
    const activeTextColor = 'rgba(' + activeText + ',' + activeText + ',' + activeText + ',1)'
    const inactiveTextColor = 'rgba(' + inactiveText + ',' + inactiveText + ',' + inactiveText + ',1)'
    const textColor = isTabActive ? activeTextColor : inactiveTextColor

    return (
      <TouchableWithoutFeedback
        key={`${name}_${page}`}
        accessible
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{color: textColor, fontWeight: 'normal'}, textStyle]}>
            {name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  @autobind
  measureTab(page, event) {
    const {x, width, height} = event.nativeEvent.layout
    this._tabsMeasurements[page] = {left: x, right: x + width, width, height}
    this.updateView({value: this.props.scrollValue.__getValue()})
  }

  @autobind
  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout
    let width = this._tabContainerMeasurements.width
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH
    }
    this.setState({_containerWidth: width})
    this.updateView({value: this.props.scrollValue.__getValue()})
  }

  @autobind
  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout
    this.updateView({value: this.props.scrollValue.__getValue()})
  }

  _tabsMeasurements = []
}

ScrollableTabBar.propTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
  style: ViewPropTypes.style,
  tabStyle: ViewPropTypes.style,
  tabsContainerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  renderTab: PropTypes.func,
  underlineStyle: ViewPropTypes.style
}

export default ScrollableTabBar
