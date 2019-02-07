import React, {Component} from 'react'
import Timer from 'react-timer-mixin'

import StyledText from 'src/components/StyledText/index'

const HALF_RAD = Math.PI / 2

export default class AnimateNumber extends Component {
  static defaultProps = {
    interval: 14,
    timing: 'linear',
    steps: 45,
    value: 0,
    formatter: (val) => val,
    onFinish: () => {}
  }

  static TimingFunctions = {
    linear: interval => interval,
    easeOut: (interval, progress) => {
      return interval * Math.sin(HALF_RAD * progress) * 5
    },
    easeIn: (interval, progress) => {
      return interval * Math.sin((HALF_RAD - HALF_RAD * progress)) * 5
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      value: 0,
      displayValue: 0
    }
    this.dirty = false
    this.startFrom = 0
    this.endWith = 0
  }

  componentDidMount () {
    this.startFrom = this.state.value
    this.endWith = this.props.value
    this.dirty = true

    this.startAnimate()
  }

  componentWillUpdate (nextProps) {
    if (this.props.value !== nextProps.value) {
      if (nextProps.pause) {
        this.setState({
          value: nextProps.value,
          displayValue: this.props.formatter(nextProps.value)
        })

        this.dirty = false

        return
      }

      this.startFrom = this.props.value
      this.endWith = nextProps.value
      this.dirty = true

      this.startAnimate()

      return
    }

    if (!this.dirty) {
      return
    }

    if (this.direction === true) {
      if (parseFloat(this.state.value) <= parseFloat(this.props.value)) {
        return this.startAnimate()
      }
    }

    if (parseFloat(this.state.value) >= parseFloat(this.props.value)) {
      this.startAnimate()
    }
  }

  render () {
    return (
      <StyledText {...this.props}>
        {this.state.displayValue}
      </StyledText>
    )
  }

  getAnimationProgress () {
    return (this.state.value - this.startFrom) / (this.endWith - this.startFrom)
  }

  getTimingFunction (interval, progress) {
    if (typeof this.props.timing === 'string') {
      const fn = AnimateNumber.TimingFunctions[this.props.timing]

      return fn(interval, progress)
    }

    if (typeof this.props.timing === 'function') {
      return this.props.timing(interval, progress)
    }

    return AnimateNumber.TimingFunctions['linear'](interval, progress)
  }

  startAnimate () {
    const progress = this.getAnimationProgress()

    Timer.setTimeout(() => {
      let value = (this.endWith - this.startFrom) / this.props.steps
      const sign = value >= 0 ? 1 : -1

      if (this.props.countBy) {
        value = sign * Math.abs(this.props.countBy)
      }

      let total = parseFloat(this.state.value) + parseFloat(value)

      this.direction = (value > 0)

      if (((this.direction) ^ (total <= this.endWith)) === 1) {
        this.dirty = false
        total = this.endWith
        this.props.onFinish(total, this.props.formatter(total))
      }

      if (this.props.onProgress) {
        this.props.onProgress(this.state.value, total)
      }

      this.setState({
        value: total,
        displayValue: this.props.formatter(total)
      })
    }, this.getTimingFunction(this.props.interval, progress))
  }
}
