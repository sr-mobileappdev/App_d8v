import React from 'react'
import {ImageBackground, Image} from 'react-native'
import {withNavigation} from 'react-navigation'
import styled from 'styled-components'
import {theme} from 'src/theme'
import {moderateScale} from 'src/utils/scaling'
import StyledText from 'src/components/StyledText'

class BusinessCard extends React.Component {
  render() {
    const {cover_photo_url: coverPhotoUrl, style} = this.props

    let coverPhoto = ''

    if (coverPhotoUrl) {
      coverPhoto = coverPhotoUrl
    }

    return (
      <Container style={style} onPress={this.onPress}>
        <PlaceCover source={{uri: 'https://res.cloudinary.com/dg9ae8hup/image/upload/v1532167392/sample.jpg'}} imageStyle={{borderRadius: 10}}>
          <Overlay />
          {/* <View style={{position:'absolute', top:0, left:0, right:0, bottom: 0, backgroundColor:'#000000', opacity:0.5}}></View>  */}
          <CoverContainer>
            {!!coverPhoto && <BusinessCover source={{uri: coverPhoto}} />}
          </CoverContainer>

          <InfoContainer>
            <Image source={{uri: 'https://i.imgur.com/BU6IIVY.jpg'}} style={styles.avatar} />
            <Title numberOfLines={1}>Fun Cafe</Title>
          </InfoContainer>
        </PlaceCover>
      </Container>
    )
  }

  onPress = () => {
    const {navigation, id: placeId} = this.props
    navigation.navigate('BusinessProfile', {placeId})
  }
}

const styles = {
  avatar: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 10,
    marginRight: 10
  }
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 24px;
`

const CoverContainer = styled.View`
  width: 88px;
  height: 128px;
  border-radius: 19px;
  overflow: hidden;
`

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  opacity: 0.5;
  border-radius: 10;
`

const PlaceCover = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  position: relative;
`

const BusinessCover = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`

const InfoContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-horizontal: 10px;
  flex-direction: row;
  position: absolute;
  width: 100%;
  height: 100%;
`

const Title = styled(StyledText)`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.title};
  font-family: ${theme.fonts.ProximaNova};
  font-weight: ${theme.fontWeight.bold};
`

export default withNavigation(BusinessCard)
