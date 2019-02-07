/**
 * @format
 * @flow
 */

import React, {PureComponent} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import PropTypes from 'prop-types'

import SectionTitle from './SectionTitle'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 80
  }
})
export default class Section extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    titleTextRight: PropTypes.string,
    onLayout: PropTypes.func,
    style: PropTypes.any
  }
  static defaultProps = {
    onLayout: () => {}
  }

  render() {
    const {
      style,
      title,
      titleTextRight,
      titleIcon,
      children,
      onLayout
    } = this.props

    return (
      <ScrollView onLayout={onLayout} style={[styles.container, style]}>
        {!!title && (
          <SectionTitle
            text={title}
            textRight={titleTextRight}
            icon={titleIcon}
          />
        )}
        {children}
      </ScrollView>
    )
  }
}
