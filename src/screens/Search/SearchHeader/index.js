import React from 'react'
import {Platform, View, Image, SafeAreaView, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  businessSearchValueSelector,
  businessSearchLoadingStatusSelector
} from '../selectors'

import BackButton from 'src/components/Buttons/BackButton'
import TextInput from 'src/components/inputs/TextInput'
import SearchIcon from './icons/search.png'
import {updateSearchValue} from '../actions'
import {theme} from 'src/theme'

const isIos = Platform.OS === 'ios'

const mapStateToProps = state => ({
  searchValue: businessSearchValueSelector(state),
  searching: businessSearchLoadingStatusSelector(state)
})

const mapDispatchToProps = {
  updateSearchValue
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class SearchHeader extends React.Component {
  static propTypes = {
    updateSearchValue: PropTypes.func.isRequired,
    withBack: PropTypes.bool,
    withBlur: PropTypes.bool,
    inversed: PropTypes.bool,
    isFocused: PropTypes.bool,
    searchValue: PropTypes.string,
    onBackPress: PropTypes.func,
    containerStyle: PropTypes.any,
    onFocus: PropTypes.func,
    blurOnFocus: PropTypes.bool,
    searching: PropTypes.bool,
    editable: PropTypes.bool
  }
  static defaultProps = {
    withBack: false,
    withBlur: false,
    inversed: false,
    isFocused: false,
    searchValue: '',
    onFocus: () => {},
    blurOnFocus: false,
    editable: true
  }
  render () {
    const {
      withBack,
      withBlur,
      inversed,
      searchValue,
      containerStyle,
      blurOnFocus,
      onFocus,
      isFocused,
      searching,
      editable
    } = this.props

    return (
      <View style={theme.handlingNotchAndroid}>
        <Container
          withBlur={withBlur}
          inversed={inversed}
          style={containerStyle}
        >
          <NavButtonsContainer>
            {withBack && (
              <BackButton
                isWhite={false}
                onPress={this.onBackPress}
                containerStyle={styles.backButtonStyle}
              />
            )}
            {editable ? (
              <SearchBarContainer>
                <TextInput
                  style={{
                    paddingRight: 35,
                    color: '#222222'
                  }}
                  isFocused={isFocused}
                  blurOnFocus={blurOnFocus}
                  onFocus={onFocus}
                  placeholder='Search'
                  inversed={inversed}
                  value={searchValue}
                  clearButtonMode='always'
                  multiline={false}
                  onChangeText={this.onSearchTextChange}
                />

                {/* {searching && <Loader />} */}
              </SearchBarContainer>
            ) : (
              <SearchBarButton onPress={onFocus}>
                <View style={styles.disabledTextContainer}>
                  <Image
                    style={{width: 19, height: 19, position: 'relative'}}
                    source={SearchIcon}
                  />
                  <DisabledTextInput editable={false} selectTextOnFocus={false}>
                    &nbsp;&nbsp;Search...
                  </DisabledTextInput>
                </View>
              </SearchBarButton>
            )}
          </NavButtonsContainer>
        </Container>
      </View>
    )
  }

  onSearchTextChange = newValue => {
    const {updateSearchValue} = this.props
    updateSearchValue(newValue)
  }
}

const styles = StyleSheet.create({
  backButtonStyle: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.38,
    shadowRadius: 13.16,
    elevation: 15
  },
  disabledTextContainer: {
    borderRadius: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginRight: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.38,
    shadowRadius: 13.16,
    elevation: 15
  }
})

const Container = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 15px 15px 0;
  background-color: transparent;
`

const NavButtonsContainer = styled(SafeAreaView)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* margin-top: 20px; */
`

const SearchBarContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  position: relative;
`

const SearchBarButton = styled.TouchableWithoutFeedback`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  position: relative
`

const DisabledTextInput = styled.TextInput`
  font-size: 18px;
  padding: 0;
  font-weight: ${isIos ? 500 : 300};
  font-family: ${theme.fonts.ProximaNova};
  color: #202020;
`

const Loader = styled.ActivityIndicator`
  position: absolute;
  top: -8px;
  right: 0;
  padding: 20px;
`

export default withNavigation(SearchHeader)
