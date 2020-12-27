/* layout for personal center page*/

import "semantic-ui-css/semantic.min.css"

import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Button,
  Image,
  List,
  Menu,
  Segment,
  Tab,
  Visibility,
} from 'semantic-ui-react'
import BottomBar from "../bottom_bar";
import TabOnChange from "./tab_onchange";
import PersonalProfile from "./friend/personal_profile";
import TopBar from "../top_bar";
import PublishModal from "../publish/publish_modal";

const textStyle ={
  fontSize: '2em',
  fontColor: 'white',
  fontWeight: 'normal',
}

const overlayStyle = {
  float: 'left',
  margin: '0em 3em 1em 0em',
}

const fixedOverlayStyle = {
  ...overlayStyle,
  position: 'fixed',
  top: '80px',
  zIndex: 10,
}

const overlayMenuStyle = {
  position: 'relative',
  left: 0,
  transition: 'left 0.5s ease',
}

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: '800px',
}

const LeftImage = () => (
  <Image
    floated='left'
    size='medium'
    src='/images/wireframe/square-image.png'
    style={{ margin: '2em 2em 2em -4em' }}
  />
)

const RightImage = () => (
  <Image
    floated='right'
    size='medium'
    src='/images/wireframe/square-image.png'
    style={{ margin: '2em -4em 2em 2em' }}
  />
)

const Paragraph = () => (
  <p inverted style={{fontSize: '1.33em', fontColor:'white', backgroundColor:'#252839'}}>
    {[
      'Meats is a video game digital distribution service by Valve. ' +
      'It was launched as a standalone software client in September 2003 as a way for ' +
      'Valve to provide automatic updates for their games, and expanded to include games' +
      ' from third-party publishers. Steam has also expanded into an online web-based and' +
      ' mobile digital storefront. Steam offers digital rights management (DRM), server hosting,' +
      ' video streaming, and social networking services. It also provides the user with installation ' +
      'and automatic updating of games, and center features such as friends lists and groups, cloud storage, ' +
      'and in-game voice and chat functionality.\n' +
      '\n' +
      'The software provides a freely available application programming interface (API) called Steamworks, ' +
      'which developers can use to integrate many of Steam\'s functions into their products, including in-game achievements,' +
      ' microtransactions, and support for user-created content through Steam Workshop. Though initially developed for use ' +
      'on Microsoft Windows operating systems, versions for macOS and Linux were later released. Mobile apps were also released' +
      ' for iOS, Android, and Windows Phone in the 2010s. The platform also offers a small selection of other content, including' +
      ' design software, hardware, game soundtracks, anime, and films.\n' +
      '\n' +
      'The Steam platform is the largest digital distribution platform for PC gaming, ' +
      'holding around 75% of the market space in 2013.[2] By 2017, users purchasing games through Steam ' +
      'totaled roughly US$4.3 billion, representing at least 18% of global PC game sales.[3] By 2019, the service' +
      '' +
      '' +
      ' had over 34,000 games with over 95 million monthly active users. The success of Steam has led to the development ' +
      'of a line of Steam Machine microconsoles, which include the SteamOS operating system and Steam Controllers.'
    ].join('')}
  </p>
)

export default class playerCommunity extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  }

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state

    if (!overlayRect) {
      this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
    }
  }

  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state

    return (
      <div>

        <style>
          {`
          html, body {
            background: #252839;
          }
        `}
        </style>

        <Container
            inverted
                style={{
        fontSize: '2em',
         fontColor: 'white',
        fontWeight: 'normal',
        background: 'black',


      }}
        text style={{
          fontSize: '2em',
          fontColor: 'white',
          marginBottom: 0,
          marginTop: '2em',
          marginLeft: '2em',
          marginRight: '2em',
        }}>
          <Header inverted as='h1'>
            <Icon name='game'/>
           Community Center : Player
      <Header.Subheader>
        {"\n"} + Where you are able to find your wishlists, your game inventory,

              your friends and what's going on.
      </Header.Subheader>
            </Header>
        </Container>

        {/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
            gone beyond the scope of visibility
          */}
        <TopBar />
        <Container>
          <Header inverted as='h2'>Your Profile</Header>
            <p {...textStyle}>
            Here is Your Profile.
          </p>



          <Visibility
            offset={10}
            once={false}
            onTopPassed={this.stickOverlay}
            onTopVisible={this.unStickOverlay}
            style={overlayFixed ? { ...overlayStyle, ...overlayRect } : {}}
          />

          <div ref={this.handleOverlayRef} style={overlayFixed ? fixedOverlayStyle : overlayStyle}>
            <Menu
              icon='labeled'
              style={overlayFixed ? fixedOverlayMenuStyle : overlayMenuStyle}
              vertical
            >
              <Menu.Item>
                <PersonalProfile name ='okay' friendNumber = '11' isDeveloper={'true'} resNumber ='2'/>
              </Menu.Item>
            </Menu>
          </div>


          {_.times(1, (i) => (
            <Paragraph key={i} />
          ))}

                <Header as='h2' inverted textAlign='center'>
                    FOR PLAYERS
                </Header>
                <Divider
                    as='h3'
                    className='header'
                    horizontal
                    inverted
                    style={{textColor: 'FFFFFF', margin: '3em 0em', textTransform: 'uppercase'}}
                > WHERE YOU PLAY/BUY GAMES
                </Divider>

          <TabOnChange />


          {_.times(1, (i) => (
            <Paragraph key={i} />
          ))}

          <Header as='h2'
                  style={{marginTop:'3em',marginBottom:'0em'}}
                  inverted textAlign='center'>
                    FOR DEVELOPERS
                </Header>
                <Divider
                    as='h3'
                    className='header'
                    horizontal
                    inverted
                    style={{textColor: 'FFFFFF', margin: '3em 0em', textTransform: 'uppercase'}}
                > WHERE YOU PUBLISH GAMES
                </Divider>
            <PublishModal/>

        </Container>

        <BottomBar />

      </div>
    )
  }
}
