import React from 'react'

import UserProfileParallax from 'src/components/Profile/UserProfileParallax'
import {Button} from 'src/components/UI/Button'
import {auth} from 'src/utils/auth'
import NavigationService from 'src/utils/NavigationService'
import UserOwnBusinesses from 'src/components/Profile/UserOwnBusinesses'
import {CreateBusinessButton} from 'src/containers/CreateBusiness/Button'

import {transformProfileData} from 'src/utils/apiData'

// TODO: delete this container as only new UserProfile is implemented
export class UserProfile extends React.PureComponent {
  state = {
    profile: {
      reviews: [
        {
          'id': 93,
          'business_id': 12,
          'user_id': '0',
          'code': 4,
          'comment': 'I have seen the review from Ms Pope and I can only assume it has been posted maliciously. I had my very pregnant Shih Tzu washed and groomed today and the end result was nothing short of EXCELLENT. Poppy was handled  with great care and gentleness. I have now booked in my three Bichon Frise to be groomed later this month.(I did not want to book them all in in case there was some truth in the previous review)In future I will always be using Dial A Dog Wash and have no hesitation in recommending them  100%  Thank you Sandra.',
          'meta': null,
          'deleted_at': null,
          'created_at': '2018-10-17 13:36:56',
          'updated_at': '2018-10-17 13:36:56',
          'images': []
        },
        {
          'id': 94,
          'business_id': 570,
          'user_id': '0',
          'code': 4,
          'comment': 'today and the end result was nothing short of EXCELLENT. Poppy was handled  with great care and gentleness. I have now booked in my three Bichon Frise to be groomed later this month.(I did not want to book them all in in case there was some truth in the previous review)In future I will always be using Dial A Dog Wash and have no hesitation in recommending them  100%  Thank you Sandra.',
          'meta': null,
          'deleted_at': null,
          'created_at': '2018-10-17 13:36:56',
          'updated_at': '2018-10-17 13:36:56',
          'images': []
        },
        {
          'id': 95,
          'business_id': 562,
          'user_id': '0',
          'code': 4,
          'comment': ' did not want to book them all in in case there was some truth in the previous review)In future I will always be using Dial A Dog Wash and have no hesitation in recommending them  100%  Thank you Sandra.',
          'meta': null,
          'deleted_at': null,
          'created_at': '2018-10-17 13:36:56',
          'updated_at': '2018-10-17 13:36:56',
          'images': []
        }
      ],
      ownBusinesses: [
        {
          'name': 'Dial a Dog Wash Ipswich',
          'id': 12
        },
        {
          'name': 'Pups & Paws Dog Walking Service',
          'id': 574
        },
        {
          'name': 'Red Dog Frames',
          'id': 383900
        },
        {
          'name': 'Newbury Road Dog Park',
          'id': 570
        },
        {
          'name': 'Four Paws Dog Grooming',
          'id': 382669
        }
      ],
      images: [],
      age: '26 - 30',
      gender: 'Female'
    }
  }

  componentDidMount () {
    this.setState(({profile}) => ({
      profile: transformProfileData(profile)
    }))
  }

  signOut = () => {
    auth.logout()
    NavigationService.navigate('Auth')
  }

  onProfileEdit = profile => {
    this.setState({profile})
    // todo: api save profile
  }

  onCreateBusiness = business => {
    const {onCreateBusiness} = this.props

    onCreateBusiness(business.id)
  }

  render () {
    const {profile} = this.state

    return (
      <UserProfileParallax
        foregroundText={'Jane Doe'}
        stickyHeaderText={'Jane Doe'}
        profile={profile}
        backgroundImageProps={{
          source: {uri: PROFILE_PICTURE_URI}
        }}
        onProfileEdit={this.onProfileEdit}
      >
        <UserOwnBusinesses profile={profile} />

        <CreateBusinessButton onBusinessCreated={this.onCreateBusiness} />

        <Button
          black
          onPress={this.signOut}
          style={{
            alignSelf: 'center',
            marginTop: 50
          }}
        >
          Sign out
        </Button>
      </UserProfileParallax>
    )
  }
}

// //
const PROFILE_PICTURE_URI = `https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
