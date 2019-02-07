import React from 'react'
import styled from 'styled-components'

import DiscoverGrid from 'src/containers/DiscoverGrid'
import SearchHeader from 'src/screens/Search/SearchHeader'

export default function DiscoverExpandedContent ({coords, openBusinessSearchModal, openBusinessProfile, onClose}) {
  return (
    <ContentContainer>
      <SearchHeader
        onFocus={openBusinessSearchModal}
        blurOnFocus
        coords={coords}
        containerStyle={{paddingTop: 0, paddingBottom: 0, width: '100%'}}
      />
      <DiscoverGrid coords={coords} openBusinessProfile={openBusinessProfile} />
    </ContentContainer>
  )
}

const ContentContainer = styled.View`
  background-color: #8c8c8c;
  flex: 1;
`
