import {Dimensions, StyleSheet} from 'react-native'

const {width} = Dimensions.get('window')

const itemHorizontalMargin = 10
const entryBorderRadius = 8

export default StyleSheet.create({
  sliderInnerContainer: {
    paddingHorizontal: itemHorizontalMargin,
    width: width * 0.8,
    paddingBottom: 18,
    height: 300
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: entryBorderRadius,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    height: 300,
    width: 300
  }
})
