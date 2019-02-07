import React from 'react'
import Camera, {RNCamera} from 'react-native-camera'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Dimensions} from 'react-native'
import {withNavigation, NavigationActions, SafeAreaView} from 'react-navigation'

import {TakePhotoButton} from 'src/components/Buttons/TakePhotoButton'
import {FlashButton} from 'src/components/Buttons/FlashButton'
import {StickersButton} from 'src/components/Buttons/StickersButton'
import {CameraRetakeButton} from 'src/components/Buttons/CameraRetakeButton'
import {GalleryPreviewButton} from 'src/components/Buttons/GalleryPreviewButton'
import {AcceptButton} from 'src/components/Buttons/AcceptButton'
import {DeclineButton} from 'src/components/Buttons/DeclineButton'

import {PhotoStickers} from 'src/components/Buttons/PhotoStickers'
import {PhotoVolume} from 'src/components/Buttons/PhotoVolume'
import {PhotoEdit} from 'src/components/Buttons/PhotoEdit'
import {PhotoText} from 'src/components/Buttons/PhotoText'
import BackButton from 'src/components/Buttons/BackButton'

class PhotoShoot extends React.PureComponent {
  static propTypes = {
    onPictureTaken: PropTypes.func
  }
  static defaultProps = {
    onPictureTaken: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      photoUri: null,
      photoBase64: null
    }
    this._camera = null
  }

  render () {
    const {photoUri} = this.state

    return (
      <PhotoShootContainer>
        {
          photoUri ? (
            <PhotoBackground source={{uri: photoUri}} resizeMode='cover'>
              <PhotoSafe forceInset={{top: 'always'}}>
                <TopButtonsContainer>
                  <PhotoStickers onPress={() => {}} />
                  <PhotoVolume onPress={() => {}} />
                  <PhotoEdit onPress={() => {}} />
                  <PhotoText onPress={() => {}} />
                </TopButtonsContainer>
                <BottomButtonsContainer>
                  <DeclineButton onPress={this.handleOnPressRetake} />
                  <Accept onPress={this.handleOnPressAccept} />
                </BottomButtonsContainer>
              </PhotoSafe>
            </PhotoBackground>
          ) : (
            <PhotoBackground
              as={RNCamera}
              ref={ref => (this._camera = ref)}
              aspect={Camera.constants.Aspect.fill}
              permissionDialogTitle='Permission to use camera'
              permissionDialogMessage='We need your permission to use your camera phone'
            >
              <PhotoSafe forceInset={{top: 'always'}}>
                <BackButton isWhite onPress={this.onClose} containerStyle={{padding: 15}} />
                <ButtonsContainer>
                  <GalleryPreviewButton onPress={() => {}} />
                  <FlashButton onPress={() => {}} />
                  <TakePhotoButton onPress={this.takePicture} />
                  <CameraRetakeButton onPress={() => {}} />
                  <StickersButton onPress={() => {}} />
                </ButtonsContainer>
              </PhotoSafe>
            </PhotoBackground>
          )
        }
      </PhotoShootContainer>
    )
  }

  takePicture = async () => {
    if (!this._camera) {
      return
    }
    const options = {quality: 0.8, base64: true, fixOrientation: true}
    const data = await this._camera.takePictureAsync(options)

    this.setState({
      photoUri: data.uri,
      photoBase64: data.base64
    })
  }

  handleOnPressRetake = () => this.setState({photoUri: null, photoBase64: null})

  handleOnPressAccept = () => {
    this.props.onPictureTaken(this.state)
    this.onClose()
  }

  onClose = () => {
    const {navigation} = this.props
    navigation.dispatch(NavigationActions.back())
  }
}

// //
const window = Dimensions.get('window')

const PhotoShootContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const PhotoSafe = styled(SafeAreaView)`
  flex: 1;
  flex-direction: column;
  width: 100%;
`

const PhotoBackground = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  height: ${window.height};
  width: ${window.width};
`
const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 20px;
  width: 100%;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
`

const BottomButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 30px 30px 0;
  margin-top: auto;
  margin-left: auto;
`

const TopButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
  padding: 0 30px;
  align-self: flex-end;
  margin-left: auto;
`

const Accept = styled(AcceptButton)`
  margin-left: 15px;
`

// const Button = styled.TouchableOpacity`
//   padding: 12px 15px;
//   background-color: #9ce4fa;
//   align-items: center;
//   align-self: center;

//   ${is('accent')`
//       background-color: #4ed4fa;
//   `}
//   ${is('left')`
//     border-bottom-left-radius: 10px;
//     border-top-left-radius: 10px;
//   `};
//   ${is('right')`
//     border-bottom-right-radius: 10px;
//     border-top-right-radius: 10px;
//   `};
// `
// const ButtonText = styled.Text`
//   color: #fff;
//   font-size: 16px;
// `

export default withNavigation(PhotoShoot)
