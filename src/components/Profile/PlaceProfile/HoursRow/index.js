import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

export default class HoursRow extends PureComponent {
  static propTypes = {
    hours: PropTypes.string,
    day: PropTypes.string
  }
  static defaultProps = {
  }

  render () {
    const {day, hours} = this.props

    return (
      <Container>
        <DayText>{day}</DayText>
        <HoursText>{hours}</HoursText>
      </Container>
    )
  }
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 2px;
  border-color: rgba(151, 151, 151, 0.2);
`

const DayText = styled(StyledText)`
  font-size: 17px;
  line-height: 44px;
  color: #FFF;
`

const HoursText = styled(DayText)`
  font-weight: 700;
`
