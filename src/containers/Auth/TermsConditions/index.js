import React from 'react'
import {
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from 'react-native'
import styled from 'styled-components'
import NavigationService from 'src/utils/NavigationService'

export class TermsConditions extends React.PureComponent {
  render() {
    return (
      <ImageBackground
        resizeMode='cover'
        source={require('src/assets/images/log-in-bg.png')}
        style={{height: '100%', width: '100%'}}
      >
        <Header>
          <TouchableWithoutFeedback onPress={() => NavigationService.goBack()}>
            <Image source={require('src/assets/icons/x-close.png')} />
          </TouchableWithoutFeedback>
        </Header>
        <ContentContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{color: 'white'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              mattis rhoncus lectus ut tincidunt. In hac habitasse platea
              dictumst. Vivamus tortor tortor, consectetur sit amet tortor eu,
              vehicula facilisis lacus. Vestibulum ac consectetur elit. Morbi
              imperdiet consectetur nunc et ullamcorper. Nam enim erat, rhoncus
              vel malesuada sed, mattis nec nisl. Praesent sagittis leo justo,
              at varius turpis facilisis eu. Quisque pulvinar nulla et odio
              interdum posuere. Maecenas non aliquet ligula, ac varius enim.
              Donec in libero diam. Phasellus eget tellus eros. Ut tristique
              imperdiet urna, sit amet cursus tellus hendrerit eu. Quisque magna
              enim, consectetur aliquet arcu id, facilisis dapibus leo. Nunc
              sollicitudin sagittis ante, ut placerat velit scelerisque
              ullamcorper. Nam rhoncus erat eget finibus fermentum. Integer nec
              massa ac mi placerat sagittis eu sed urna. Vivamus tellus augue,
              pulvinar ut purus eget, vulputate scelerisque lectus. Sed at augue
              scelerisque, tincidunt quam nec, cursus justo. Nunc viverra, massa
              vitae blandit pharetra, sapien urna tempor ante, sed sollicitudin
              diam diam nec magna. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Phasellus sit amet volutpat odio. Donec eget
              lobortis magna, ac malesuada justo. Vestibulum interdum auctor
              pellentesque. Nulla facilisi. Praesent eget dolor id lectus
              convallis ullamcorper eget sit amet felis. Proin sed vehicula
              risus. Proin nec mi a sapien tincidunt pharetra. Suspendisse
              egestas eu dolor eget pretium. Maecenas aliquet vel lacus mollis
              tincidunt. Nullam nec nulla ex. Donec laoreet mi vel sem posuere,
              in ullamcorper elit interdum. Praesent at elit maximus, dapibus
              neque sed, mollis quam. Sed ac eleifend metus. Maecenas consequat
              condimentum ipsum, vitae ullamcorper dolor varius in. Cras
              tincidunt, augue id laoreet commodo, nunc quam mattis libero, a
              pellentesque lorem justo ac lectus. Cras volutpat nibh a diam
              condimentum, nec fringilla dolor malesuada. Nam finibus mollis
              lorem, at venenatis dolor ullamcorper in. Integer mauris dolor,
              pulvinar vulputate accumsan non, maximus et est. Vivamus pulvinar
              metus eu risus faucibus congue. Nunc ac posuere ante, eget rhoncus
              elit. Fusce venenatis pharetra rutrum. Quisque a elementum ante.
              Praesent pulvinar non urna sit amet maximus. Sed a arcu sit amet
              neque efficitur sodales nec id quam. Praesent et iaculis nisl.
              Suspendisse nec sem semper, suscipit quam ullamcorper, mattis
              orci. Sed gravida varius sem vitae congue. Sed posuere tellus
              erat, sit amet iaculis erat sodales et. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec ultricies, enim ac euismod venenatis, mauris est commodo
              nisi, vitae vestibulum tellus risus at metus. Quisque interdum sem
              purus. Donec congue sapien et posuere tristique.
            </Text>
          </ScrollView>
        </ContentContainer>
      </ImageBackground>
    )
  }
}

const Header = styled.View`
  marginTop: 30;
  marginLeft: 20;
  padding: 10px;  
`

const ContentContainer = styled.View`
  flex: 1;
  marginLeft: 30;
  marginRight: 30;
  marginTop: 10;
  marginBottom: 30;  
`
