import Svg from 'react-native-svg'
import Circle from 'react-native-svg/elements/Circle'
import Path from 'react-native-svg/elements/Path'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

EmojiFeedbackIndicator.propTypes = {
  status: PropTypes.number,
  size: PropTypes.number
}

export function EmojiFeedbackIndicator ({size, status, style}) {
  const delta = status / 5 * 80

  return (
    <EmojiContainer {...{style}}>
      <Svg
        height={size}
        width={size}
        viewBox='0 0 200 200'
      >
        <Circle
          cx='100'
          cy='100'
          r='85'
          fill={computeEmojiFill(status)}
          stroke='black'
          strokeWidth='15'
        />
        <Circle cx='65' cy='75' r='15' fill='black' stroke='black' />
        <Circle cx='135' cy='75' r='15' fill='black' stroke='black' />
        <Circle cx='60' cy='140' r='7' fill='black' strokeWidth='0' />
        <Circle cx='140' cy='140' r='7' fill='black' strokeWidth='0' />

        <Path
          d={`M60 140 Q 100 ${(180 - delta)} 140 140`}
          fill='none'
          stroke='black'
          strokeWidth='15'
        />
      </Svg>
    </EmojiContainer>
  )
}

// //
const EmojiContainer = styled.View`
  align-items: center;
  justify-content: center;
`

//
const coefficient = (status, max, difference) => Math.ceil((status / max) * difference)

const computeEmojiFill = (status) => {
  const r1 = 116
  const r2 = 255
  const g1 = 203
  const g2 = 82
  const b1 = 39
  const b2 = 82
  const max = 5

  const rDifference = Math.abs(r1 - r2)
  const gDifference = Math.abs(g1 - g2)
  const bDifference = Math.abs(b1 - b2)

  const r = r1 + coefficient(status, max, rDifference)
  const g = g1 - coefficient(status, max, gDifference)
  const b = b1 + coefficient(status, max, bDifference)

  return `rgb(${r}, ${g}, ${b})`
}
