/**
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Image, ScrollView, ImageBackground, FlatList, TouchableWithoutFeedback} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
// import {HeaderBackButton, SafeAreaView} from 'react-navigation'

import Text from 'src/components/Text'
import AttributeItem from './AttributeItem'
import GridList from 'react-native-grid-list'

import ProfileEdit from './ProfileEdit'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const avatar = require('src/assets/images/leon-tan-unsplash.jpg')

/*
const chatIcon = require('src/assets/icons/Icon-Comment.png')
const likeIcon = require('src/assets/icons/Icon-Like.png')
*/

const styles = StyleSheet.create({
  page: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  profileName: {
    fontSize: 27,
    lineHeight: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',
    fontFamily: 'Proxima Nova',
    marginTop: 5,
    marginLeft: screenWidth / 6,
    marginRight: screenWidth / 6,
    marginBottom: 5
  },
  profileDescription: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginTop: 5,
    marginLeft: screenWidth / 6,
    marginRight: screenWidth / 6,
    marginBottom: 5,
    fontFamily: 'Proxima Nova'
  },
  avatar: {
    backgroundColor: '#68a0cf',
    borderRadius: screenWidth / 5,
    borderWidth: 3,
    borderColor: '#fff',
    width: screenWidth / 2.5,
    height: screenWidth / 2.5,
    alignSelf: 'center',
    marginBottom: 5
  },
  avatarWrapper: {
  },
  bottomAlignWrapper: {

  },
  attributeIcons: {
    marginLeft: 10,
    marginRight: 10
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  feedList: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  feedGridList: {
    height: screenHeight - 20
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  coverPhotoGradient: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%'
  },
  feedLogoName: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  },
  feedLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1
  },
  feedNameTitle: {
    flexDirection: 'column',
    marginLeft: 5
  },
  feedName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
    margin: 1,
    fontFamily: 'Proxima Nova'
  },
  feedTitle: {
    fontSize: 15,
    textAlign: 'left',
    color: '#fff',
    margin: 1,
    fontFamily: 'Proxima Nova'
  },
  bigTileStyle: {
    width: screenWidth - 20,
    height: screenWidth - 20,
    margin: 10,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',

    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 10
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  chat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    margin: 10
  },
  smallTileStyle: {
    width: screenWidth - 20,
    height: (screenWidth - 20) / 2 + 60,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  smallSubTileStyle: {
    width: (screenWidth - 30) / 2,
    height: '100%',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,

    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 10
  },
  likeChat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 10,
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  smallBackgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  attributeGrid: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  }

})

export default class ProfileTabView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profileName: 'Trendy Bar',
      profileDescription: 'Different lengths of text that should push the avatar/name up!',
      bShowText: true,
      attributeItems: [
        {
          icon: 'facebook',
          text: 'LONGATTRIBUTEITEM'
        },
        {
          icon: 'apple',
          text: 'ATTRIBUTE'
        },
        {
          icon: 'android',
          text: 'LONGATTRIBITEM'
        }
      ],
      feedList: [
        {
          image: require('src/assets/images/1.jpg'),
          logo: require('src/assets/images/logo.jpg'),
          like: 50,
          chat: 30,
          size: 2,
          name: 'DEAN MICHEL',
          title: 'Fresh Joe'
        },
        {
          size: 1,
          items: [{
            image: require('src/assets/images/2.png'),
            logo: require('src/assets/images/logo.jpg'),
            like: 50,
            chat: 30
          },
          {
            image: require('src/assets/images/3.jpg'),
            logo: require('src/assets/images/logo.jpg'),
            like: 50,
            chat: 30
          }]
        },
        {
          image: require('src/assets/images/1.jpg'),
          logo: require('src/assets/images/logo.jpg'),
          like: 50,
          chat: 30,
          size: 2,
          name: 'DEAN MICHEL',
          title: 'Fresh Joe'
        },
        {
          size: 1,
          items: [{
            image: require('src/assets/images/2.png'),
            logo: require('src/assets/images/logo.jpg'),
            like: 50,
            chat: 30
          },
          {
            image: require('src/assets/images/3.jpg'),
            logo: require('src/assets/images/logo.jpg'),
            like: 50,
            chat: 30
          }]
        }
      ],
      blurValue: 0,
      timer: null,
      whiteToBlack: 0,
      showTooltip: false,
      EditProfileMode: 0 // 1: coverPhoto, 2: avatar, 3: title, 4: description, 5: info
    }
  }

  componentDidMount() {
  }

  toggleTooltip = () => {
    this.setState({showTooltip: !this.state.showTooltip})
  }

  renderAttributeItem = ({item, index}) => {
    if (this.state.attributeItems.length % 3 === 2) {
      if (this.state.attributeItems.length - index <= 2) {
        if (index % 3 === 0) { return <AttributeItem item={item} toggleTooltip={this.toggleTooltip} specMargin={100} /> } else { return <AttributeItem item={item} toggleTooltip={this.toggleTooltip} specMargin={-100} /> }
      }
    }
    return <AttributeItem item={item} toggleTooltip={this.toggleTooltip} specMargin={0} />
  }

  renderFeedItem = ({item}) => {
    if (item.size === 2) {
      return (
        <View style={styles.bigTileStyle}>
          <ImageBackground source={item.image} style={styles.backgroundImage} imageStyle={{borderRadius: 20}}>

            <LinearGradient
              locations={[0, 0.3]}
              colors={[
                'rgba(0, 0, 0, 0.7)',
                'rgba(0, 0, 0, 0)'
              ]}
              style={styles.gradient}
            />
            <LinearGradient
              locations={[0.7, 1]}
              colors={[
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.7)'
              ]}
              style={styles.gradient}
            />

            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
              <View style={styles.feedLogoName} >
                <View>
                  <Image source={item.logo} style={styles.feedLogo} />
                </View>
                <View style={styles.feedNameTitle}>
                  <Text style={styles.feedName}>{item.name}</Text>
                  <Text style={styles.feedTitle}>{item.title}</Text>
                </View>
              </View>
              <View style={styles.chat}>
                <View />
                <View>

                  <Text style={styles.feedTitle}>Chat: {item.chat}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )
    } else if (item.size === 1) {
      return (
        <View style={styles.smallTileStyle}>

          {item.items.map((item, index) => {
            return (
              <View style={styles.smallSubTileStyle}>
                <ImageBackground source={item.image} style={styles.smallBackgroundImage} imageStyle={{borderRadius: 20}}>

                  <LinearGradient
                    locations={[0, 0.3]}
                    colors={[
                      'rgba(0, 0, 0, 0.7)',
                      'rgba(0, 0, 0, 0)'
                    ]}
                    style={styles.gradient}
                  />

                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', borderRadius: 20}}>
                    <View style={styles.feedLogoName} >
                      <View>
                        <Image source={item.logo} style={styles.feedLogo} />
                      </View>
                      <View style={styles.feedNameTitle}>
                        <Text style={styles.feedName}>{item.name}</Text>
                        <Text style={styles.feedTitle}>{item.title}</Text>
                      </View>
                    </View>
                    <View style={styles.likeChat}>
                      <View />
                      <View style={{marginRight: 5}}>
                        <Text>L: {item.like}</Text>
                      </View>
                      <View>

                        <Text>C: {item.chat}</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            )
          })}

        </View>
      )
    }
  }

  editTitle = () => {
    this.setState({EditProfileMode: 1})
  }

  onEndEdit = () => {
    this.setState({EditProfileMode: 0})
  }

  render = () => {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} onScroll={this.props.handleScroll} scrollEventThrottle={50} overScrollMode='never' scrollEnabled={!this.state.showTooltip}>

          <View style={styles.page}>

            <LinearGradient
              locations={[0.5, 0.8, 1]}
              colors={[
                'rgba(255, 255, 255, 0)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)'
              ]}
              style={styles.coverPhotoGradient}
            />

            <View style={{height: screenHeight / 4}}>
              <Text>{'\n'}</Text>
            </View>

            <View style={styles.bottomAlignWrapper}>
              <View style={styles.avatarWrapper}>
                <Image source={avatar} style={styles.avatar} />

                <TouchableWithoutFeedback onPress={this.editTitle}>
                  <Text style={styles.profileName}>
                    {this.state.profileName}
                  </Text>
                </TouchableWithoutFeedback>

                {this.state.bShowText &&
                  <TouchableWithoutFeedback onPress={this.editDescription}>
                    <Text style={styles.profileDescription}>
                      {this.state.profileDescription}
                    </Text>
                  </TouchableWithoutFeedback>
                }
              </View>

              <View style={styles.attributeIcons}>

                <GridList
                  data={this.state.attributeItems}
                  numColumns={screenWidth < 200 ? 2 : 3}
                  renderItem={this.renderAttributeItem}
                  style={styles.attributeGrid}
                />

              </View>
            </View>
          </View>

          <View>
            <FlatList style={{backgroundColor: 'rgba(250, 250, 250, 1)'}}
              data={this.state.feedList}
              renderItem={this.renderFeedItem}
            />
          </View>

        </ScrollView>

        {this.state.EditProfileMode > 0 &&
        <ProfileEdit style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} onEndEdit={this.onEndEdit} backgroundImage={this.props.backgroundImage} >
          <Text>Hello</Text>
        </ProfileEdit>
        }

      </View>
    )
  }
}
