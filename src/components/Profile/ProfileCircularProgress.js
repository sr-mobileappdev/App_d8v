import React from 'react'
import styled from 'styled-components'
import {Dimensions} from 'react-native'

import {AnimatedCircularProgress} from 'src/components/AnimatedCircularProgress'

export function ProfileCircularProgress ({style, rating, pause}) {
  rating = Math.round(rating) // TODO: remove when server sends integer

  return (
    <ProfileCircularProgressContainer style={style}>
      <AnimatedCircularProgress
        size={circleSize}
        width={circleLineWidth}
        prefill={0}
        fill={rating}
        tintColor='#4CD964'
        backgroundColor='#cdccd4'
        endGradColor='#88d2d6'
        startGradColor='#8bcf8d'
        pause={pause}
        rotation={0}
        lineCap='round'
      />

      <CircularProgressNumberContainer />
    </ProfileCircularProgressContainer>
  )
}

// //
const {width} = Dimensions.get('window')
const circleSize = width / 2
const circleLineWidth = 15
const innerCircleSize = circleSize - circleLineWidth * 2

const ProfileCircularProgressContainer = styled.View`
  align-self: center;
  margin: 20px 20px 20px;
`

const CircularProgressNumberContainer = styled.View`
  position: absolute;
  width: ${innerCircleSize};
  height: ${innerCircleSize};
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: ${innerCircleSize / 2};
  top: ${circleLineWidth};
  left: ${circleLineWidth};
`
