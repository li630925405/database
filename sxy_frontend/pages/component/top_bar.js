/* layout for top side bars*/

import "semantic-ui-css/semantic.min.css"

import {Container, Dropdown, Image, Menu, Visibility} from "semantic-ui-react";
import React, { Component } from 'react'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '3em',
  marginTop: '3em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: 'teal',
  border: '1px solid #ddd',
  boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)',
}



export default class TopBar extends Component{

  state = {
    menuFixed: false,
    overlayFixed: false,
  }


  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickTopMenu = () => this.setState({ menuFixed: false })


  render() {
    const { menuFixed } = this.state

    return (

        <Visibility
            onBottomPassed={this.stickTopMenu}
            onBottomVisible={this.unStickTopMenu}
            once={false}
        >
          <Menu
              inverted
              borderless
              fixed={menuFixed ? 'top' : undefined}
              style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container>
              <Menu.Item>
                <Image size='mini' src='/logo.png'/>
              </Menu.Item>
              <Menu.Item header>MEATS</Menu.Item>
              <Menu.Item as='a' href = '../store/browser_pg'>STORE</Menu.Item>

              {/* 需要查询然后予以修改！*/}
              <Menu.Item as='a' href={ '../center/communi_pg'}>COMMUNITY CENTER</Menu.Item>

              <Menu.Menu position='right'>
                <Dropdown text='Other' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item as ='a' href ='../../container/homepage'> HOME</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Header>ACCOUNT</Dropdown.Header>
                    <Dropdown.Item as='a' href='../../container/modify' >Change Account Info
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

    )
  }
}
