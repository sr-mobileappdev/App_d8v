import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Bubbles} from 'react-native-loader'
import {KeyboardAvoidingView} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import api from 'src/api'
import {PostPhotoBlock} from 'src/containers/CreatePost/ui/PostPhotoBlock'
import {PhotoShootModal} from 'src/components/PhotoShoot/Modal'
import {CameraButton} from 'src/components/Buttons/Camera'
import {FormContainer} from 'src/components/UI/FormContainer'
import {log} from 'src/utils/fn'

import StyledText from 'src/components/StyledText'

export class CreatePost extends React.PureComponent {
  static propTypes = {
    containerStyle: PropTypes.object,
    sliderStyle: PropTypes.object,
    datepickerStyle: PropTypes.object,
    size: PropTypes.number,
    placeId: PropTypes.number,
    onPostSent: PropTypes.func
  }

  static defaultProps = {
    size: 150,
    onPostSent: () => {}
  }

  state = {
    showCamera: false,
    photoUri: null,
    photoBase64: null,
    isSubmitting: false,
    expireDate: null,
    isExpireDatePickerVisible: false
  }

  onPictureTaken = ({photoUri, photoBase64}) => {
    this.setState({
      photoUri,
      photoBase64
    }, this.hideModalPhotoShoot)
  }

  handleExpireDateChange = expireDate => this.setState({
    expireDate,
    isExpireDatePickerVisible: false
  })

  showModalPhotoShoot = () => this.setState({showCamera: true})

  hideModalPhotoShoot = () => this.setState({showCamera: false})

  showExpireDatePicker = () => this.setState({isExpireDatePickerVisible: true})

  hideExpireDatePicker = () => this.setState({isExpireDatePickerVisible: false})

  initExpireDate = () => this.setState({expireDate: null});

  submitPost = async () => {
    const {
      photoBase64,
      expireDate
    } = this.state
    const {
      placeId,
      onPostSent
    } = this.props

    if (!placeId) {
      return
    }

    const data = {
      business_id: placeId,
      ...(photoBase64 && {photo: photoBase64})
    }

    if (expireDate) {
      data.expire_date = expireDate
    }

    this.setState({isSubmitting: true})

    try {
      const response = await api.create({
        route: `business-posts`,
        data
      })

      this.setState({isSubmitting: false})

      if (!response.errors) {
        onPostSent(response)
      } else {
        log.error('SERVER ERROR', response)
        // TODO: treat error
      }
    } catch (e) {
      this.setState({isSubmitting: false})
      log.error('SERVER ERROR', e)
    }
  }

  render () {
    const {
      containerStyle
    } = this.props
    const {
      showCamera,
      isSubmitting,
      photoUri,
      expireDate
    } = this.state

    return (
      <>
        <CreatePostScrollView>
          <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
            <CreatePostInnerWrapper>
              <PostPhotoBlock {...{photoUri}}>
                <CameraButton onPress={this.showModalPhotoShoot} />
              </PostPhotoBlock>

              <PostFormContainer style={containerStyle}>
                <FormContainer>
                  <InfoRow>
                    <ExpireDateText>Expire Date</ExpireDateText>
                  </InfoRow>
                  <DatePickerContainer>
                    <ExpireDateButtonText
                      onPress={this.showExpireDatePicker}
                      empty={!expireDate}
                    >
                      {
                        expireDate ? expireDate.toISOString().slice(0, 10).replace(/-/g, '/') : 'Select Expire Date'
                      }
                    </ExpireDateButtonText>
                    {
                      expireDate &&
                        <FontAwesomeIcon
                          name='times-circle'
                          style={{fontSize: 30}}
                          onPress={this.initExpireDate}
                        />
                    }
                  </DatePickerContainer>
                  <DateTimePicker
                    isVisible={this.state.isExpireDatePickerVisible}
                    onConfirm={this.handleExpireDateChange}
                    onCancel={this.hideExpireDatePicker}
                  />
                </FormContainer>

                <SubmitButton onPress={this.submitPost}>
                  {isSubmitting ? (
                    <Bubbles size={5} color='#FFFFFF' />
                  ) : (
                    <SubmitButtonText>CREATE POST</SubmitButtonText>
                  )}
                </SubmitButton>
              </PostFormContainer>
            </CreatePostInnerWrapper>
          </KeyboardAvoidingView>
        </CreatePostScrollView>

        <PhotoShootModal {...{
          isVisible: showCamera,
          onPictureTaken: this.onPictureTaken,
          onClose: this.hideModalPhotoShoot
        }} />
      </>
    )
  }
}

const CreatePostScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {flexGrow: 1}
})`
  flex: 1;
  background-color: transparent;
`

const CreatePostInnerWrapper = styled.View`
  flex: 1;
`
const PostFormContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`

const DatePickerContainer = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #afb1b2;
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
const ExpireDateButtonText = styled(StyledText)`
  color: ${props => props.empty ? '#afb1b2' : '#000'};
  font-weight: normal;
  padding-bottom: 5px;
`

const InfoRow = styled.View`
  justify-content: flex-start;
  width: 80%;
  padding-top: 20px;
  padding-bottom: 20px;
`

const ExpireDateText = styled(StyledText)`
  color: #000;
  font-weight: bold;
`
