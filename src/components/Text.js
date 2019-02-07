// @flow
import PropTypes from 'prop-types'
import React from 'react'
import {Text, StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics} from '../theme'

const styles = StyleSheet.create({
  text: {
    ...Fonts.style.description,
    color: Colors.primaryText
  },
  reverse: {color: Colors.alternateTextColor},
  secondary: {color: Colors.secondaryText},
  small: {
    ...Fonts.style.small
  },
  regular: {
    ...Fonts.style.regular
  },
  link: {color: Colors.link},
  marginNormal: {
    marginVertical: Metrics.marginVertical
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  center: {textAlign: 'center'},
  h1: Fonts.style.h1,
  h2: Fonts.style.h2,
  h3: Fonts.style.h3,
  h4: Fonts.style.h4,
  h5: Fonts.style.h5,
  h6: Fonts.style.h6
})

const TextElement = props => {
  const {
    style,
    children,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    small,
    regular,
    fontFamily,
    reverse,
    secondary,
    link,
    margin,
    center,
    color,
    uppercase,
    ...rest
  } = props

  return (
    <Text
      style={[
        styles.text,
        small && styles.small,
        regular && styles.regular,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        h5 && styles.h5,
        h6 && styles.h6,
        margin === 'normal' && styles.marginNormal,
        center && styles.center,
        color && {color},
        reverse && styles.reverse,
        secondary && styles.secondary,
        link && styles.link,
        style && style
      ]}
      {...rest}
    >
      {children}
    </Text>
  )
}

TextElement.propTypes = {
  style: PropTypes.any,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  reverse: PropTypes.bool,
  secondary: PropTypes.bool,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  fontFamily: PropTypes.string,
  children: PropTypes.any
}

export default TextElement
