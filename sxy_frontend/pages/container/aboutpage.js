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
  Embed, Input
} from 'semantic-ui-react'
import BottomBar from "../basic/bottom_bar";
import TopBar from "../basic/top_bar";
import GameTable from "../component/store/game_table";
import SearchGameTable from "../component/store/search_gtable";
import {data, data2} from "../component/store/browser_pg";




class AboutLayout extends React.Component{
  render() {
    return (
     <Container>
                <style>
                    {`
      html, body {
        background-color: #252839 !important;
      }
      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
                </style>


                <Header as='h2' icon inverted textAlign='center'>
                    <Icon name='paper plane'/>
                    About Us
                    <Header.Subheader>
                        ...Ready To Hear Our Story?
                    </Header.Subheader>
                </Header>
                <Divider/>




                <TopBar/>



                <Divider
                    as='h3'
                    className='header'
                    horizontal
                    inverted
                    style={{textColor: 'FFFFFF', margin: '3em 0em', textTransform: 'uppercase'}}
                > WE ARE DEVELOPERS OF TODAY
                </Divider>

               <p inverted  style={{fontSize: '1.33em', fontColor:'FFFFFF', backgroundColor:'#252839'}}>
                   {'GOG.com is built with tons of our own super-uber complex algorithms, ' +'\n' +
                 'x-dimensional-databases and other stuff so wicked, that sometimes' +'\n' +
                 'even we aren\'t really sure how it works... But it\'s not only that.' +'\n'+
                 'We\'re also using some of our favourite third-party icons, frameworks,' +'\n'+
                 'libraries and technology and we would like to send kudos to people who created them:' +'\n'+
'Yusuke Kamiyamane for Diagona and Fugue Icon packs - www.pinvoke.com' +'\n'+
'Mark James for FamFamFam Silk Icons pack - www.famfamfam.com' +'\n'+
'jQuery Team for jQuery JavaScript Library - www.jquery.com' +'\n'+
'DOSBox Crew for their DOS emulator which we use with some of our games - www.dosbox.com' +'\n'+
'Jordan Russell for Inno Setup engine - www.jrsoftware.org/isinfo.php' +'\n'+
'Chris Mallett for AutoHotkeys tool - www.autohotkey.com' +'\n'+
'Audiere authors for their high-level audio API - audiere.sourceforge.net' +'\n'+
'David Barton for Delphi Cryptography Package - www.cityinthesky.co.uk/cryptography.html' +'\n'+
'ScummVM crew for their wonderful emulator which we use with some of our games - www.scummvm.org' +'\n'+
'FoxIt Software crew for their clean and snappy PDF Reader - www.foxitsoftware.com/pdf/reader/' +'\n'+
'Jonatan Castro for his 32px Mania & Web Injection icon sets - www.midtonedesign.com' +'\n'+
'Jonas Rask for his DRF icon set - jonasraskdesign.com' +'\n'+
'Bogdan Mihaiciuc for his Project Icons set - bogo-d.deviantart.com' +'\n'+
'Zeus Software crew, for their nGlide wrapper - www.zeus-software.com/downloads/nglide' +'\n'+
'Alun Bestor for Boxer - www.boxerapp.com' +'\n'+
'Doh123 and Wineskin Project for Wineskin - wineskin.urgesoftware.com '+'\n'}
               </p>

                <Divider
                    as='h3'
                    className='header'
                    horizontal
                    inverted
                    style={{textColor: 'FFFFFF', margin: '3em 0em', textTransform: 'uppercase'}}
                > THIS IS THE END
                </Divider>


          <BottomBar/>
            </Container>

    )
  }
}

export default AboutLayout;
