// @flow
import {Platform} from 'react-native'
import {moderateScale, normalize} from '../utils/scaling'

const type = {
  base: 'Proxima Nova',
  bold: 'Proxima Nova',
  emphasis: 'Proxima Nova'
}

if (Platform.OS === 'android') {
  type.base = 'Proxima Nova'
  type.bold = 'Proxima Nova'
}

const size = {
  h1: moderateScale(38),
  h2: moderateScale(34),
  h3: moderateScale(30),
  h4: moderateScale(26),
  h5: moderateScale(20),
  h6: moderateScale(19),
  input: moderateScale(18),
  regular: moderateScale(16),
  medium: moderateScale(15),
  small: moderateScale(13)
}

const style = {
  h1: {
    fontWeight: 'bold',
    fontFamily: type.base,
    fontSize: size.h1,
    lineHeight: normalize(1.5 * size.h1)
  },
  h2: {fontWeight: 'bold', fontSize: size.h2, lineHeight: 1.5 * size.h2},
  h3: {
    fontWeight: 'bold',
    fontFamily: type.emphasis,
    fontSize: size.h3,
    lineHeight: normalize(1.5 * size.h3)
  },
  h4: {
    fontWeight: 'bold',
    fontFamily: type.base,
    fontSize: size.h4,
    lineHeight: normalize(1.5 * size.h4)
  },
  h5: {
    fontWeight: 'bold',
    fontFamily: type.base,
    fontSize: size.h5,
    lineHeight: normalize(1.5 * size.h5)
  },
  h6: {
    fontWeight: 'bold',
    fontFamily: type.emphasis,
    fontSize: size.h6,
    lineHeight: normalize(1.5 * size.h6)
  },
  regular: {
    fontFamily: type.base,
    fontSize: size.regular,
    lineHeight: normalize(1.5 * size.regular)
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
    lineHeight: normalize(1.5 * size.medium)
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small,
    lineHeight: normalize(1.5 * size.small)
  }
}

export default {type, size, style}
