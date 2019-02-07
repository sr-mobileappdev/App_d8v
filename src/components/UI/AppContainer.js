import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import PropTypes from 'prop-types'

import {Dimensions} from 'react-native'

AppContainer.propTypes = {
  justify: PropTypes.bool
}

export function AppContainer (props) {
  return (
    <AppContainer$$>
      <AppMainScrollView keyboardShouldPersistTaps='always'>
        <AppMainKeyboardAvoidingView behavior='padding'>
          <AppContainerContent {...props} />
        </AppMainKeyboardAvoidingView>
      </AppMainScrollView>
    </AppContainer$$>
  )
}

// //
const window = Dimensions.get('window')
const appContainerMinHeight = window.height - 15 * 2 - 20

const AppContainer$$ = styled.View`
  background-color: #fff;
  flex: 1;
`
const AppContainerContent = styled.View`
  flex: 1;
  background-color: transparent;
  min-height: ${appContainerMinHeight};
  
  ${is('justify')`
    justify-content: center;
    align-items: center;
  `}
`
const AppMainScrollView = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background-color: transparent;
`
const AppMainKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: transparent;
`
