import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

const mainBlack = '#2c3033'
const mainGrey = '#a1a1a3'

export const SectionTitle = styled(StyledText)`
  font-size: 18px;
  color: ${mainBlack};
  margin-bottom: 10px;
  font-weight: bold;
`
export const MainFont = styled(StyledText)`
  font-size: 16px;
  color: ${mainGrey};
`
