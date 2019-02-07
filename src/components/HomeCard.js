// @flow
import React, {PureComponent} from 'react'
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native'
import IconIonicon from 'react-native-vector-icons/Ionicons'
import Slider from 'react-native-slider'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'

import Touchable from './Touchable'
import Text from './Text'
import {Metrics, Icons, Colors} from 'src/theme'
import {moderateScale} from 'src/utils/scaling'
import autobind from 'autobind-decorator'

const PADDING = 15
const LOTTIE_LOOPS = 8
const LOTTIE_TIME = 11 * 1000
const LOTTIE_STEP = 1 / LOTTIE_LOOPS

const styles = StyleSheet.create({
  bgImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenWidth + moderateScale(2 * PADDING)
  },
  bgImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
    justifyContent: 'space-between'
  },
  bgImageStyle: {
  },
  cardTop: {
    flexDirection: 'row',
    width: Metrics.screenWidth,
    alignItems: 'center',
    height: moderateScale(40 + 2 * PADDING)
  },
  avatarContainer: {
    width: moderateScale(40 + 2 * PADDING),
    alignItems: 'center'
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
    borderWidth: 1,
    borderColor: '#fff'
  },
  textTopContainer: {
    flex: 1
  },
  onlyTextTopContainer: {
    marginLeft: moderateScale(PADDING),
    flex: 1
  },
  actionButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(60),
    overflow: 'visible'
  },
  cardBottomInner: {
    width: Metrics.screenWidth - moderateScale(2 * PADDING),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: moderateScale(60)
  },
  send: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: moderateScale(30)
  },
  slider: {
    width: Metrics.screenWidth / 2,
    height: moderateScale(60),
    justifyContent: 'center',
    flex: 1,
    overflow: 'visible'
  },
  formRow: {
    flexDirection: 'row',
    height: 9
  },
  marginSpace: {
    width: moderateScale(10),
    backgroundColor: 'transparent'
  },
  track: {
    position: 'absolute',
    width: '50%',
    height: 9
  },

  trackContainer: {
    flex: 1,
    width: '100%'
  },

  trackGrey: {
    position: 'absolute',
    width: '100%',
    height: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#D3D3D3'
  },
  thumb: {
    width: moderateScale(34),
    height: moderateScale(34),
    backgroundColor: 'transparent'
  },
	thumbTouch: {
		width: moderateScale(100),
		height: moderateScale(100)
	},
  boldText: {
    fontWeight: '700'
  },
  lottieContainer: {
    position: 'absolute',
    left: 0,
    width: moderateScale(60),
    height: moderateScale(60),
    justifyContent: 'flex-end',
    backgroundColor: 'yellow'
  },
  lottieView: {
    left: 0 // -moderateScale(5),
    // height: Metrics.screenWidth / 2,
    // alignSelf: 'center',
    // marginBottom: -moderateScale(40)
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: Colors.white
  }
})

class HomeCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sliderValue: 0.5,
      lottieProgress: new Animated.Value(0.5),
      lottieScale: this.calculateScaleFromSlider(0.5),
      isLottieShown: false,
      isAnimatedDone: false
    }
    this.onSliderChanged = this.onSliderChanged.bind(this)
    this.onSlidingCompleted = this.onSlidingCompleted.bind(this)
    this.sliderWidth = Metrics.screenWidth / 2
  }

  render() {
    const {
      backgroundUrl,
      author,
      totalSympathy,
      totalComments,
      place,
      onlyBussness
    } = this.props
    const transform = [{
      scale: this.state.lottieScale
    }]

    return (
      <TouchableWithoutFeedback onPress={this.props.onPressCard}>
        <View style={styles.bgImageContainer}>
          <ImageBackground
            source={{uri: backgroundUrl}}
            style={styles.bgImage}
            imageStyle={styles.bgImageStyle}
          >
            <View style={styles.cardTop}>
              {!onlyBussness &&
              <View style={styles.avatarContainer}>
                <Image source={{uri: author.photoUrl}} style={styles.avatar} />
              </View>
              }
              {!onlyBussness &&
              <View style={styles.textTopContainer}>
                <Text style={styles.boldText} reverse>
                  {author.fullName}
                </Text>
                <Text reverse small>
                  {place}
                </Text>
              </View>
              }
              {onlyBussness &&
              <View style={styles.onlyTextTopContainer}>
                <Text style={styles.boldText} reverse>
                  {place}
                </Text>
              </View>
              }
              <Touchable
                onPress={() => {}}
                innerContainerStyle={styles.actionButton}
              >
                <IconIonicon name='ios-bookmark' color='#FFFFFF' size={30} />
              </Touchable>
            </View>

            <LinearGradient
              style={styles.cardBottom}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              colors={['#000000E4', '#00000000']}>
              <View style={styles.cardBottomInner}>
                <View style={styles.slider}
                  onLayout={(event) => this.measureView(event)}>

                  <View style={this.lottieStyle()}>
                    { this.state.isLottieShown &&
                      <LottieView style={{...styles.lottieView, transform: transform}}
                        source={require('../assets/lotties/emoji.json')}
                        loop
                        progress={this.state.lottieProgress}
                      />
                    }
                  </View>

                  <View style={styles.formRow}>
                    <View style={styles.marginSpace} />
                    <View style={styles.trackContainer}>
                      <View style={styles.trackGrey} />
                      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FB6E40', '#FCCD01']} style={this.gradientTrackStyle()} />
                    </View>
                    <View style={styles.marginSpace} />
                  </View>

                  <Slider
                    style={{width: '100%', height: '100%', position: 'absolute'}}
                    value={this.state.sliderValue}
                    onValueChange={this.onSliderChanged}
                    onSlidingComplete={this.onSlidingCompleted}
                    thumbImage={Icons.slider_thumb}
                    thumbStyle={styles.thumb}
					thumbTouchSize={styles.thumbTouch}
                    maximumTrackTintColor={'transparent'}
                    minimumTrackTintColor={'transparent'}
                  />
                </View>

                <Image
                  style={styles.icon}
                  source={Icons.like}
                />

                <Text style={styles.boldText} reverse>
                  {Math.floor(totalSympathy / 1000)}K
                </Text>

                <Touchable innerContainerStyle={styles.comments}>
                  <Image
                    style={styles.icon}
                    source={Icons.comment}
                  />
                  <Text style={styles.boldText} reverse>
                    {totalComments}
                  </Text>
                </Touchable>
                <Touchable innerContainerStyle={styles.send}>
                  <Image
                    style={styles.icon}
                    source={Icons.send}
                  />
                </Touchable>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  measureView(event) {
    this.sliderWidth = event.nativeEvent.layout.width
  }

  lottieStyle() {
    let emojiSize = 120
    let scale = 0

    if (this.state.sliderValue > 0.5) {
      scale = (this.state.sliderValue - 0.5) / 0.5 * emojiSize * 0.2
    } else if (this.state.sliderValue < 0.5) {
      scale = (0.5 - this.state.sliderValue) / 0.5 * emojiSize * 0.2
    }

    emojiSize += scale

    const left = (this.sliderWidth - moderateScale(emojiSize / 2)) * this.state.sliderValue +
        moderateScale(emojiSize / 2) / 2 - moderateScale(emojiSize) / 2

    return {
      position: 'absolute',
      left: left,
      top: -moderateScale(emojiSize / 2 + emojiSize * 0.15),
      width: moderateScale(emojiSize),
      height: moderateScale(emojiSize),
      justifyContent: 'flex-end'
    }
  }

  gradientTrackStyle() {
    var width = Math.round(this.state.sliderValue * 100) + '%'
    return {
      position: 'absolute',
      width: width,
      height: 9,
      borderRadius: 10
    }
  }

  repeatEmojiAnim(value, reverse = false) {
    if (!this.state.isAnimatedDone) return

    var stage = Math.floor(value * LOTTIE_LOOPS)
    stage = Math.min(stage, LOTTIE_LOOPS - 1)

    this.setState({
      lottieProgress: new Animated.Value((reverse ? stage + 1 : stage) * LOTTIE_STEP)
    }, () => {
      Animated.timing(this.state.lottieProgress, {
        toValue: LOTTIE_STEP * (reverse ? stage : stage + 1),
        duration: LOTTIE_TIME / LOTTIE_LOOPS,
        easing: Easing.linear
      }).start(() => {
        this.repeatEmojiAnim(value, !reverse)
      })
    })
  }

  onSlidingCompleted(value) {
    console.log('sliding completed')
    console.log(this.state.isAnimatedDone)

    var stage = Math.floor(value * LOTTIE_LOOPS)
    stage = Math.min(stage, LOTTIE_LOOPS - 1)

    this.setState({
      sliderValue: value,
      lottieScale: this.calculateScaleFromSlider(value),
      isLottieShown: true,
      sAnimatedDone: false
    }, () => {
      Animated.timing(this.state.lottieProgress, {
        toValue: LOTTIE_STEP * (stage + 1),
        duration: LOTTIE_TIME / LOTTIE_LOOPS,
        easing: Easing.linear
      }).start(() => {
        console.log('Animation DONE')
        this.state.isAnimatedDone = true
        this.repeatEmojiAnim(value, true)
      })
    })
  }

  onSliderChanged(value) {
    var stage = Math.floor(value * LOTTIE_LOOPS)
    stage = Math.min(stage, LOTTIE_LOOPS - 1)

    this.setState({
      sliderValue: value,
      // lottieProgress: new Animated.Value(stage * LOTTIE_STEP),
      lottieScale: this.calculateScaleFromSlider(value),
      isLottieShown: true,
      isAnimatedDone: false
    }, () => {
      Animated.timing(this.state.lottieProgress, {
        toValue: LOTTIE_STEP * (stage + 1),
        duration: LOTTIE_TIME /** Math.abs(prevSliderValue - value) */ / LOTTIE_LOOPS,
        easing: Easing.linear
      }).start(() => {
      })
    })
  }

  calculateScaleFromSlider(value) {
    return 1 /* 1 + 0.2 * Math.abs(value - 0.5) */
  }

  @autobind
  onPressCard() {
    this.props.onPressCard()
  }
}

export default HomeCard
