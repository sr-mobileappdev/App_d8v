// @flow
import {Platform, StatusBar} from 'react-native'
import Colors from './Colors'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Images from './Images'
import Icons from './Icons'
import Svgs from './Svgs'

const theme = {
  colors: {
    white: '#fff',

    black: '#000000',
    grey85: '#222222',

    darkBlue: '#161823',
    skyBlue: '#4ed4fa',
    skyBlue90: '#77e1ff',
    woodBlue: '#2a464e',
    greyDark: '#222222'
  },
  fonts: {
    ProximaNova: 'Proxima Nova'
  },
  spacing: {
    regular: '15px',
    large: '30px'
  },
  fontSize: {
    regular: '17px',
    title: '27px'
  },
  fontWeight: {
    bold: 700,
    regular: 500,
    lighter: 200
  },
  handlingNotchAndroid: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  }
}

export {Colors, Fonts, Metrics, Images, Icons, Svgs, theme}
