import React from 'react'
import Svg, {Defs, LinearGradient, Stop, Path} from 'react-native-svg'

const LocationMark = props => (
  <Svg width={214} height={256} {...props}>
    <Defs>
      <LinearGradient id='prefix_a' x1={107} y1={0} x2={107} y2={256}>
        <Stop offset={0} stopColor='#4e00cc' />
        <Stop offset={1} stopColor='#00b6ea' />
      </LinearGradient>
    </Defs>
    <Path
      d='M98 117.333l13.4 53.333L151.333 64 44.667 104zM108.667 0C49.755 0 2 46.88 2 104.693c0 58.72 46.667 98.87 106.667 151.307 60-52.437 106.667-92.587 106.667-151.307C215.333 46.88 167.568 0 108.667 0zm0 192.011A85.339 85.339 0 1 1 194 106.677a85.33 85.33 0 0 1-85.333 85.334z'
      transform='translate(-2)'
      fill='url(#prefix_a)'
    />
  </Svg>
)

export default {
  LocationMark
}
