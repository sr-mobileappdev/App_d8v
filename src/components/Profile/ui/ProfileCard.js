import styled from 'styled-components'
import is from 'styled-is'

export const ProfileCard = styled.View`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 3px;
  margin: 25px 10px 0;
  border-style: solid;
  border-color: #a8a9aa;
  border-width: 1px;
  
  ${is('noBackground')`
    background-color: transparent;
    border-width: 0;
  `};
`
