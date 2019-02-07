import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {View, ViewPropTypes} from 'react-native'
import {Svg, Path, G, Defs, LinearGradient, Stop} from 'react-native-svg'

export default class CircularProgress extends PureComponent {
  render () {
    const {
      size,
      width,
      backgroundWidth,
      backgroundColor,
      startGradColor,
      endGradColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
      children
    } = this.props

    const startAngle = 0
    const endAngle = arcSweepAngle * this.clampFill(fill) / 100
    const {path: backgroundPath} = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle)
    const {path: circlePath} = this.circlePath(size / 2, size / 2, size / 2 - width / 2, startAngle, endAngle)
    const offset = size - (width * 2)

    const childContainerStyle = {
      position: 'absolute',
      left: width,
      top: width,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
      <View style={[style, {
        shadowColor: '#fff',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 1
      }]}>
        <Svg
          width={size}
          height={size}
          style={{backgroundColor: 'transparent'}}
        >
          <G rotation={rotation} originX={size / 2} originY={size / 2}>
            {backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                fill='transparent'
              />
            )}

            <Defs>
              <LinearGradient id='grad1'>
                <Stop offset='0%' stopColor={startGradColor} stopOpacity='1' />
                <Stop offset='100%' stopColor={endGradColor} stopOpacity='1' />
              </LinearGradient>
            </Defs>

            <Path
              d={circlePath}
              stroke={'url(#grad1)'}
              strokeWidth={width}
              strokeLinecap={lineCap}
              fill='transparent'
            />
          </G>
        </Svg>

        {children && (
          <View style={childContainerStyle}>
            {children(fill)}
          </View>
        )}
      </View>
    )
  }

  polarToCartesian (centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  circlePath (x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle * 0.9999)
    const end = this.polarToCartesian(x, y, radius, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ]

    return {path: d.join(' '), start, end}
  }

  clampFill = fill => Math.min(100, Math.max(0, fill))
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360
}
