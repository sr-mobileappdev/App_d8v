import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'react-native-slider'
import {Bubbles} from 'react-native-loader'
import {KeyboardAvoidingView} from 'react-native'

import api from 'src/api'
import {EmojiFeedbackIndicator} from 'src/components/EmojiFeedbackIndicator'
import {ReviewPhotoBlock} from 'src/containers/PlaceReview/ui/ReviewPhotoBlock'
import {PhotoShootModal} from 'src/components/PhotoShoot/Modal'
import {CameraButton} from 'src/components/Buttons/Camera'
import {log} from 'src/utils/fn'

import StyledText from 'src/components/StyledText'

const dummyData = {
  data: [
    {
      joyLikelihood: 'VERY_UNLIKELY',
      angerLikelihood: 'VERY_LIKELY'
    },
    {
      joyLikelihood: 'LIKELY',
      angerLikelihood: 'UNLIKELY'
    }
  ]
}

export class PlaceReview extends React.PureComponent {
  static propTypes = {
    containerStyle: PropTypes.object,
    sliderStyle: PropTypes.object,
    size: PropTypes.number,
    onFeedbackSent: PropTypes.func
  }

  static defaultProps = {
    size: 150,
    onFeedbackSent: () => {}
  }

  state = {
    status: 0,
    comment: '',
    showCamera: false,
    photoUri: null,
    photoBase64: null,
    isSubmitting: false
  }

  uploadImage = async () => {
    const {
      photoBase64
    } = this.state

    const {
      onFeedbackSent
    } = this.props

    try {
      const response = await api.create({
        route: `face-detection`,
        photoBase64
      })
      if (!response.errors) {
        onFeedbackSent(response)
      } else {
        /* log.error('SERVER ERROR', response) */
        // TODO: treat error
      }
    } catch (e) {
      /* log.error('SERVER ERROR', e) */
    }
  }

  calcSmileyValue = () => {
    let statusValues = []
    if (dummyData.data.length) {
      const arrayOfFaces = dummyData.data
      const facesLikelihood = ['UNKNOWN', 'VERY_LIKELY', 'LIKELY', 'POSSIBLE', 'UNLIKELY', 'VERY_UNLIKELY']
      arrayOfFaces.map(item => {
        statusValues.push(facesLikelihood.reverse().indexOf(item.angerLikelihood))
        statusValues.push(facesLikelihood.reverse().indexOf(item.joyLikelihood))
      })
    }
    this.setState({
      status: (statusValues.reduce((total, value) => total + value) / statusValues.length)
    })
  }

  onPictureTaken = async ({photoUri, photoBase64}) => {
    this.setState({
      photoUri,
      photoBase64
    }, this.hideModalPhotoShoot)
    await this.uploadImage()
    this.calcSmileyValue()
  }

  showModalPhotoShoot = () => this.setState({showCamera: true})

  hideModalPhotoShoot = () => this.setState({showCamera: false})

  submitReview = async () => {
    const {
      status,
      comment = '',
      photoBase64
    } = this.state
    const {
      placeId,
      onFeedbackSent
    } = this.props

    if (!placeId) {
      return
    }

    const data = {
      business_id: placeId,
      code: Math.round(5 - status),
      ...(comment && {comment}),
      ...(photoBase64 && {photo: photoBase64})
    }

    this.setState({isSubmitting: true})

    try {
      const response = await api.create({
        route: `business-reviews`,
        data
      })

      this.setState({isSubmitting: false})

      if (!response.errors) {
        onFeedbackSent(response)
      } else {
        log.error('SERVER ERROR', response)
        // TODO: treat error
      }
    } catch (e) {
      this.setState({isSubmitting: false})
      log.error('SERVER ERROR', e)
    }
  }

  handleFeedbackSlideChange = status => this.setState({status})

  handleFeedbackInputChange = comment => this.setState({comment})

  render () {
    const {
      containerStyle,
      sliderStyle,
      size
    } = this.props
    const {
      status,
      comment,
      showCamera,
      isSubmitting,
      photoUri
    } = this.state

    return (
      <>
        <PlaceReviewScrollView>
          <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
            <PlaceReviewInnerWrapper>
              <ReviewPhotoBlock {...{photoUri}}>
                <CameraButton onPress={this.showModalPhotoShoot} />
              </ReviewPhotoBlock>

              <FeedbackFromContainer style={containerStyle}>
                <EmojiFeedbackIndicator {...{size, status}} />

                <SliderContainer style={sliderStyle}>
                  <Slider
                    style={{width: '80%'}}
                    minimumTrackTintColor={darkPink}
                    thumbTintColor={darkPink}
                    value={status}
                    minimumValue={0}
                    maximumValue={5}
                    onValueChange={this.handleFeedbackSlideChange}
                    trackStyle={{height: 3}}
                    thumbTouchSize={{width: 40, height: 40}}
                  />
                </SliderContainer>

                <FeedbackInputText
                  multiline
                  onChangeText={this.handleFeedbackInputChange}
                  value={comment}
                  returnKeyType='done'
                  placeholder='Let us know what you think'
                />

                <SubmitButton onPress={this.submitReview}>
                  {isSubmitting ? (
                    <Bubbles size={5} color='#FFFFFF' />
                  ) : (
                    <SubmitButtonText>LEAVE REVIEW</SubmitButtonText>
                  )}
                </SubmitButton>
              </FeedbackFromContainer>
            </PlaceReviewInnerWrapper>
          </KeyboardAvoidingView>
        </PlaceReviewScrollView>

        <PhotoShootModal {...{
          isVisible: showCamera,
          onPictureTaken: this.onPictureTaken,
          onClose: this.hideModalPhotoShoot
        }} />
      </>
    )
  }
}

// //
const darkPink = '#45d4fe'

const PlaceReviewScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {flexGrow: 1}
})`
  flex: 1;
  background-color: transparent;
`

const PlaceReviewInnerWrapper = styled.View`
  flex: 1;
`
const FeedbackFromContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-top: -30px;
`
const SliderContainer = styled.View`
  width: 80%;
  align-items: center;
  margin-bottom: 20px;
`
const FeedbackInputText = styled.TextInput.attrs({placeholderTextColor: '#afb1b2'})`
  width: 80%;
  border-bottom-width: 1px;
  border-color: #afb1b2;
`
const SubmitButton = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 7px;
  margin: 15px 0;
  background-color: #2a464e;
  height: 40px;
  border-radius: 5px;
  flex-direction: row;
`
const SubmitButtonText = styled(StyledText)`
  color: #fff;
  text-align: center;
  font-weight: bold;
  margin-right: 10px;
`
