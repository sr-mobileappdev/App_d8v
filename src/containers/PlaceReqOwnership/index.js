import React from 'react'
import {connect} from 'react-redux'
import {Picker} from 'react-native-picker-dropdown'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {ActivityIndicator, Alert, Platform} from 'react-native'

import {
  ownershipMethodsSelector,
  requestOwnershipSelector,
  ownershipMethodsServersSelector
} from 'src/containers/PlaceReqOwnership/selectors'
import {
  ownershipMethodRequest,
  confirmOwnershipRequest,
  requestOwnershipRequest
} from 'src/containers/PlaceReqOwnership/actions'
import {extractErrorMessage, isArray, log} from 'src/utils/fn'
import {AppContainer} from 'src/components/UI/AppContainer'
import {Button} from 'src/components/UI/Button'
import {theme} from 'src/theme'
import {FormContainer} from 'src/components/UI/FormContainer'
import {InputText} from 'src/components/UI/InputText'

import StyledText from 'src/components/StyledText'

const mapStateToProps = state => ({
  isSuccess: ownershipMethodsSelector(state).isSuccess,
  isFetching: ownershipMethodsSelector(state).isFetching,
  requestOwnershipSelectorIsFetching: requestOwnershipSelector(state)
    .isFetching,
  methods: ownershipMethodsServersSelector(state)
})
const mapDispatchToProps = {
  requestOwnershipRequest,
  confirmOwnershipRequest,
  ownershipMethodRequest
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class PlaceReqOwnership extends React.PureComponent {
  static propTypes = {
    placeId: PropTypes.number,
    onOwnershipRequested: PropTypes.func
  }

  static defaultProps = {
    onOwnershipRequested: () => {}
  }

  state = {
    showSms: false,
    code: '',
    reqMethod: ''
  }

  componentDidMount() {
    this.props.ownershipMethodRequest(this.props.placeId)
  }

  render() {
    const {showSms} = this.state

    return (
      <AppContainer>
        <Container center justify>
          {showSms ? this.renderConfirmForm() : this.renderRequestForm()}
        </Container>
      </AppContainer>
    )
  }

  onReqMethodChange = reqMethod => {
    this.setState({reqMethod})
  }

  requestOwnership = async () => {
    const {placeId, onOwnershipRequested, requestOwnershipRequest} = this.props
    const {reqMethod} = this.state

    const data = {
      ...JSON.parse(reqMethod),
      userInfo: {
        OS: Platform.OS,
        Version: Platform.Version,
        isTesting: Platform.isTesting
      }
    }

    try {
      const result = await requestOwnershipRequest(placeId, data)
      if (result.error) {
        return _alertError(result)
      }

      if (/^phone$/i.test(data.method)) {
        this.setState({showSms: true})
      } else {
        onOwnershipRequested(result.response)
      }
    } catch (e) {
      _alertError(e)
    }
  }

  confirmOwnership = async () => {
    const {placeId, onOwnershipRequested, confirmOwnershipRequest} = this.props
    const {code} = this.state

    const data = {
      // todo: fix this
      code
    }

    try {
      const result = await confirmOwnershipRequest(placeId, data)
      if (result.error) {
        return _alertError(result)
      }

      onOwnershipRequested(result.response)
    } catch (e) {
      _alertError(e)
    }
  }

  renderRequestForm = () => {
    const {
      isSuccess,
      isFetching,
      requestOwnershipSelectorIsFetching,
      methods
    } = this.props
    const thereAreMethods =
      !isFetching && isArray(methods) && methods.length > 0
    const showPicker = isSuccess && thereAreMethods
    const {reqMethod} = this.state
    const defaultItems = [
      {
        method: '',
        values: ['- tap to select -']
      }
    ]
    const normalizedMethods = showPicker
      ? _normalizeMethods(defaultItems.concat(methods))
      : []

    return thereAreMethods ? (
      <>
        <Title>Please select one of the available options</Title>

        {showPicker ? (
          <ReqMethodPicker
            selectedValue={reqMethod}
            onValueChange={this.onReqMethodChange}
          >
            {normalizedMethods.map(({method, value, rawValue}, index) => (
              <Picker.Item
                {...{
                  label: index === 0 ? rawValue : `${method}:   ${rawValue}`,
                  value,
                  key: `${method}-${rawValue}`
                }}
              />
            ))}
          </ReqMethodPicker>
        ) : isFetching ? (
          <LoaderContainer>
            <ActivityIndicator size='large' color={theme.colors.woodBlue} />
          </LoaderContainer>
        ) : (
          <ErrorMessage>Seems like an error has occurred!</ErrorMessage>
        )}

        {showPicker && (
          <Button
            onPress={this.requestOwnership}
            isLoading={requestOwnershipSelectorIsFetching}
          >
            Request ownership
          </Button>
        )}
      </>
    ) : (
      <ErrorMessage>
        Sorry, we can't confirm your ownership for this place.
      </ErrorMessage>
    )
  }

  renderConfirmForm = () => {
    return (
      <>
        <InputText
          placeholder='Received sms code'
          keyboardType='number-pad'
          onChangeText={code => this.setState({code})}
          value={this.state.code}
        />

        <Button black onPress={this.confirmOwnership}>
          Confirm ownership
        </Button>
      </>
    )
  }
}

// //
function _alertError(errorObject = {}) {
  Alert.alert('Whoops!', extractErrorMessage(errorObject))
  log.error('SERVER ERROR', errorObject)
}

function _normalizeMethods(methods) {
  return methods
    .map(({method, values}) =>
      values.map(value => ({
        method,
        rawValue: value,
        value: JSON.stringify({method, address: value})
      }))
    )
    .reduce((normalizedMethods, item) => normalizedMethods.concat(item), [])
}

const Container = styled(FormContainer)`
  flex: 0;
  margin: auto 0;
  background-color: ${props => props.theme.colors.white};
  padding: 40px 10px;
  border-radius: 5px;
`
const ReqMethodPicker = styled(Picker)`
  width: 100%;
  flex: 1;
  margin: 10px 0 40px;
`
const LoaderContainer = styled.View`
  margin: 10px 0 40px;
`
const Title = styled(StyledText)`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`
const ErrorMessage = styled(StyledText)`
  padding: 50px 10px 20px;
  font-size: 16px;
`
