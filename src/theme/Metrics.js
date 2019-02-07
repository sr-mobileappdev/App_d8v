// @flow
import {Dimensions, Platform, StatusBar} from 'react-native'
import {scale, verticalScale, moderateScale} from '../utils/scaling'

const {width, height} = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  // bottomNavigationHeight:
  marginHorizontal: scale(16),
  marginVertical: verticalScale(16),
  section: moderateScale(25),
  baseMargin: moderateScale(10),
  doubleBaseMargin: moderateScale(20),
  smallMargin: moderateScale(5),
  doubleSection: moderateScale(50),
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  appBarHeight: Platform.OS === 'ios' ? 44 : 56,
  statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  buttonRadius: 4,
  basicRadius: Platform.OS === 'ios' ? 10 : 3,
  icons: {
    tiny: moderateScale(18),
    small: moderateScale(24),
    medium: moderateScale(38),
    large: moderateScale(45),
    xl: moderateScale(50)
  },
  images: {
    small: moderateScale(24),
    medium: moderateScale(40),
    large: moderateScale(50),
    logo: moderateScale(200)
  },
  spacing: {
    regular: '15px',
    large: '30px'
  }
}

export default metrics
