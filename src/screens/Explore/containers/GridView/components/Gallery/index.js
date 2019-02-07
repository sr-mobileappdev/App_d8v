import React from 'react'
import {TouchableOpacity, FlatList} from 'react-native'
import styled from 'styled-components'

import GalleryItem from './GalleryItem'
import StyledText from 'src/components/StyledText'

const Gallery = (props) => {
  const {images, last} = props

  return (
    <Container last={last}>
      <TitleContainer>
        <TextBold>{images.name}</TextBold>
        <TouchableOpacity>
          <Text>See all</Text>
        </TouchableOpacity>
      </TitleContainer>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 15}}
        horizontal
        data={images.data}
        extraData={this.state}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <GalleryItem data={item} />}
      />
    </Container>
  )
}

export default Gallery

const Container = styled.View`
  margin-top: 20px;
  margin-bottom: ${props => props.last ? 45 : 5}px;
`

const TitleContainer = styled.View`
  flexDirection: row; 
  justifyContent: space-between;
  paddingHorizontal: 15px;
  margin-bottom: 15px;
`

const Text = styled(StyledText)`
  font-size: 17px;
  font-weight: 500;
  color: #FFF;
`

const TextBold = styled(Text)`
  font-weight: 700;
`
