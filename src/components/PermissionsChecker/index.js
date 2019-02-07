import React from 'react'
import {Alert, AppState, Platform} from 'react-native'
import Permissions from 'react-native-permissions'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AndroidOpenSettings from 'react-native-android-open-settings'
import Modal from 'react-native-modal'
import {log} from 'src/utils/fn'
import {AppContainer} from 'src/components/UI/AppContainer'
import {Button} from 'src/components/UI/Button'
import StyledText from 'src/components/StyledText'
import {Svgs} from 'src/theme'

export class PermissionsChecker extends React.PureComponent {
  static propTypes = {
    modal: PropTypes.bool,
    types: PropTypes.array,
    messages: PropTypes.object
  }

  state = {
    status: {},
    canOpenSettings: false
  }

  componentDidMount() {
    const canOpenSettings = Platform.OS === 'android' || Permissions.canOpenSettings()

    this.setState({canOpenSettings})
    this.updatePermissions()
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  render() {
    const {children, types, messages} = this.props
    const {status} = this.state

    const isAuthorized = type => status[type] === 'authorized'
    const isUnauthorized = type => !isAuthorized(type)

    const unauthorizedTypes = types.filter(isUnauthorized)
    const allPermissionsGranted = types.every(isAuthorized)

    return allPermissionsGranted
      ? children
      : this.contentWrapper(
        <AppContainer justify>
          <PermissionsContainer>
		  	<LocationMarkContainer />
            {unauthorizedTypes.map(p => (
              <PermissionContainer key={p}>
                <PermissionDescription>
                  {messages[p].description}
                </PermissionDescription>
                <PermissionDetail>
                  {messages[p].detail}
                </PermissionDetail>
                <Button permissCheckBtn onPress={() => this.requestPermission(p)} >
                  {messages[p].actionButton}
                </Button>
                {false && this.state.canOpenSettings && (
                  <Button permissCheckBtn onPress={this.openSettings}>Open settings</Button>
                )}
              </PermissionContainer>
            ))}
          </PermissionsContainer>

          {false && <FooterContainer>
            {this.state.canOpenSettings && (
              <Button onPress={this.openSettings}>Open settings</Button>
            )}
          </FooterContainer>}
        </AppContainer>
      )
  }

  // update permissions when app comes back from settings
  handleAppStateChange = appState => {
    if (appState === 'active') {
      this.updatePermissions()
    }
  }

  openSettings = () => {
    if (Platform.OS === 'android') {
      AndroidOpenSettings.appDetailsSettings()
    } else {
      Permissions.openSettings()
    }
  }

  updatePermissions = (types = this.props.types) => {
    Permissions.checkMultiple(types).then(status => this.setState({status}))
  }

  requestPermission = permission => {
    const options = permission === 'location' ? 'whenInUse' : void 0

    Permissions.request(permission, options)
      .then(res => {
        this.setState({
          status: {...this.state.status, [permission]: res}
        })

        if (res !== 'authorized') {
          const alertButtons = [{text: 'Cancel', style: 'cancel'}]

          if (this.state.canOpenSettings) {
            alertButtons.push({
              text: 'Open Settings',
              onPress: this.openSettings
            })
          }

          Alert.alert(
            'Whoops!',
            'There was a problem getting your permission. Please enable it from settings.',
            alertButtons
          )
        }
      })
      .catch(log.error)
  }

  contentWrapper = content => {
    const {modal} = this.props

    if (modal) {
      return <Modal isVisible>{content}</Modal>
    } else {
      return content
    }
  }
}

const PermissionsContainer = styled.View`
  flex: 1;
  justify-content: center;
`
const FooterContainer = styled.View`
  padding-top: 10px;
  width: 70%;
  flex-direction: row;
  justify-content: flex-end;
  align-self: flex-end;
`
const PermissionContainer = styled.View`
  align-items: center;
`
const PermissionDescription = styled(StyledText)`
  text-align: center;
  font-weight: normal;
  padding: 20px 40px;
  font-size: 27px;
  color: ${props => props.theme.colors.black};
`
const PermissionDetail = styled(PermissionDescription)`
  font-size: 16px;
  margin-bottom: 20px;
`
const LocationMarkContainer = styled(Svgs.LocationMark)`
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 20px;
`
