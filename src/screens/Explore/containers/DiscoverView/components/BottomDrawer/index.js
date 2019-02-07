import React from 'react'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

export default function BottomDrawer () {
  return (
    <>
      <TitleContainer>
	  	<HandleContent>
          <HandleBar />
        </HandleContent>
        <StyledText style={{fontWeight: '500', fontSize: 18}}>Near me...</StyledText>
      </TitleContainer>
    </>
  )
}

const TitleContainer = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-size: 18px;
  padding: 15px 30px;
  color: #000;
`

const HandleContent = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  align-items: center;
  justify-content: center;
`

const HandleBar = styled.View`
  height: 4px;
  border-radius: 2px;
  background-color: #ccc;
  width: 30px;
`

