/* layout for index page*/

import "semantic-ui-css/semantic.min.css";
import { createMedia } from "@artsy/fresnel"
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
    Embed
} from 'semantic-ui-react'
import BottomBar from "../basic/bottom_bar";

//responsive design
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    computer: 1024,
  },
})

/*
 * header
 */

const EmbedVideo = () => (
  <Embed
    autoplay={false}
    brandedUI
    color='white'
    hd={false}
    id='I4Dh16chNx0'
    placeholder='/homepage/video.png'
    source='youtube'
  />
)


const HomepageHeading = ({ mobile }) => (
  <Container text>

    <Header as='h1'
      content='Meats: Platform'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as='h2'
      content='"Always trust video games."'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
      }}
    />
    <Button as={'a'} href ='/component/store/browser_pg' primary size='huge' color={'teal'} >
      GO TO STORE AND HAVE A LOOK
      <Icon name='right arrow' />
    </Button>
  </Container>
)


HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* responsive navigation bar
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active href ='/container/homepage'>
                  Home
                </Menu.Item>
                <Menu.Item as='a' href={'/component/store/browser_pg'}>Store</Menu.Item>
                <Menu.Item as='a' href={'/container/aboutpage'}>About</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed} color={'teal'} href = '/container/login'>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} color={'teal'}  href = '/container/register'
                          style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}


const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class HomepageLayout extends React.Component{
  render() {
    return (
    <ResponsiveContainer>
      <Segment style={{padding: '8em 0em'}} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{fontSize: '2em'}}>
                We MAKE GAMES MORE AVAILABLE
              </Header>
              <p style={{fontSize: '1.33em'}}>
                Meats offers mostly Windows games along with some macOS titles.
                The free Meats app is a terrific way to buy new releases or preorder upcoming releases.
                If there's a major new PC game, Meats likely has the title—provided that the game's publisher isn't selling it exclusively from its own store.
                For example, you can only buy the Forza Horizon racing series from Xbox,
                Overwatch from Battle.net, Fortnite from the Store, and Red Dead Redemption 2 from the Rockstar Games Launcher.
              </p>
              <Header as='h3' style={{fontSize: '2em'}}>
                We OFFER COMMUNITIES TO SOCIALISE
              </Header>
              <p style={{fontSize: '1.33em'}}>
                Yes that's right, Community Hubs are collections of all the best community and official game content as rated by users.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/homepage/2077.png'/>
              <Image bordered rounded size='large' src='/homepage/de.png'/>
              <Image bordered rounded size='large' src='/homepage/biy.png'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge' color={'teal'} href={'/component/store/browser_pg'}>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{padding: '0em'}} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
              <Header as='h3' style={{fontSize: '2em'}}>
                <Icon name='app store' />
                "AS A DEVELOPER"
              </Header>
              <p style={{fontSize: '1.33em'}}>
                Publishers providing services such as sound design
                and code packages.</p>
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
              <Header as='h3' style={{fontSize: '2em'}}>
                 <Icon name='playstation' />
                "AS A PLAYER"
              </Header>
              <p style={{fontSize: '1.33em'}}>
                 Players buy, play game, write reviews and enjoy socialising with friends.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{padding: '8em 0em'}} vertical>
        <Container text>
          <Divider
              as='h4'
              className='header'
              horizontal
              style={{margin: '3em 0em', textTransform: 'uppercase'}}
          >
            <a>Enjoy Your Hell of Ride to Video Games</a>
          </Divider>
            <EmbedVideo inverted/>

            <Divider
                as='h4'
              className='header'
              horizontal
                style={ {margin:'3em 3em', textTransform: 'uppercase'}}>
              <a>To Know Our Story</a>
            </Divider>
          <Header as='h3' style={{fontSize: '2em'}}>
            About Our Platform
          </Header>
          <p style={{fontSize: '1.33em'}}>
            Yes, this platform is developed by three buddies, dr.li, teacher wang and cat su.
            If you find any bugs, please contact us at nowheretobefound@404.com.
          </p>
          <Button as='a' size='large' color={'teal'} floated={'center'}>
            View Platform Details
          </Button>
        </Container>
      </Segment>

      <BottomBar/>

    </ResponsiveContainer>
    )
  }
}

export default HomepageLayout;
