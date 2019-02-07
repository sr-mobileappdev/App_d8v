import React from 'react'
import styled from 'styled-components'
import {TouchableOpacity, ActivityIndicator, View} from 'react-native'
import is, {isNot} from 'styled-is'
import PropTypes from 'prop-types'

import StyledText from 'src/components/StyledText'

import {theme} from 'src/theme'

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  isLoading: PropTypes.bool,
  black: PropTypes.bool
}

export function Button({children, white, black, onPress, permissCheckBtn, isLoading, ...rest}) {
  const buttonWrapperProps = {
    black,
    white,
    permissCheckBtn,
    ...(isLoading ? {as: View} : {onPress}),
    ...rest
  }
  const activityIndicatorColor = black
    ? theme.colors.white
    : theme.colors.grey85

  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {isLoading ? (
        <ActivityIndicator size='small' color={activityIndicatorColor} />
      ) : (
        <ButtonText {...{black, white, children, permissCheckBtn}} />
      )}
    </ButtonWrapper>
  )
}

// //
const ButtonWrapper = styled.TouchableOpacity`
  margin-bottom: 20px;
  padding: 12px 15px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.skyBlue};
  align-items: center;

  ${is('disabled')`
    opacity: 0.5;
  `}
  ${is('fluid')`
    flex: 1;
  `}
  ${isNot('fluid')`
    width: 70%;
  `}
  ${is('small')`
    width: 40%
  `}
  ${is('white')`
    background-color: ${props => props.theme.colors.white};
  `}
  ${is('permissCheckBtn')`
    background-color: ${props => props.theme.colors.greyDark};
    width: 80%;
    border-radius: 26px;
  `}
  ${is('black')`
    background-color: ${props => props.theme.colors.woodBlue};
  `}
`
const ButtonText = styled(StyledText)`
  color: ${props => props.theme.colors.grey85};
  font-size: 16px;
  font-weight: bold;
  ${is('white')`
    color: ${props => props.theme.colors.skyBlue};
  `}
  ${is('black')`
    color: ${props => props.theme.colors.white};
  `}
  ${is('permissCheckBtn')`
    color: ${props => props.theme.colors.white};
    font-size: 24px;
  `}
`
