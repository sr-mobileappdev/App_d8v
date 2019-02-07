import React from 'react'
import styled from 'styled-components'

import {theme} from 'src/theme'

const StyledText = ({style, children}) => <Text style={style}>{children}</Text>

const Text = styled.Text`
  font-family: ${theme.fonts.ProximaNova};
  font-weight: 400;
`

export default StyledText
