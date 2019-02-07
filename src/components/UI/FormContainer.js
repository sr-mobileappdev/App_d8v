import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import PropTypes from 'prop-types'

FormContainer.propTypes = {
  center: PropTypes.bool,
  justify: PropTypes.bool
}

export function FormContainer (props) {
  return (
    <FormContainer$$ {...props} />
  )
}

const FormContainer$$ = styled.View`  
  align-items: center;
  width: 100%;  
  
  ${is('center')`
    align-items: center;
  `}
  ${is('justify')`
    justify-content: center;
  `}
`
