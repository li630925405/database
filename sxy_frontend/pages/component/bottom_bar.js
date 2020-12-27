/* layout for bottom side bars*/

import "semantic-ui-css/semantic.min.css"
import {Container, Divider, Grid, Header, Image, List, Segment} from "semantic-ui-react"
import React, { Component } from 'react'


function BottomBar() {
  return <Segment inverted style={{ margin: '4em 0em 0em', padding: '5em 0em' }} vertical>
          <Container textAlign='center'>
            <Grid columns={4} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Main' />
                  <List link inverted>
                    <List.Item as='a' href={'../../container/homepage'}>Home</List.Item>
                    <List.Item as='a' href = '../store/browser_pg'>Store</List.Item>
                    <List.Item as='a' href={ '../center/communi_pg'}>Community</List.Item>
                    <List.Item as='a' href ='../../container/aboutpage'>About</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Contact Us' />
                  <List link inverted>
                    <List.Item as='a' href ='https://twitter.com/daysoftraumerei'>Twitter</List.Item>
                    <List.Item as='a' href ='https://www.linkedin.com/in/yazhou-li-1982b41a4/'>Linked In</List.Item>
                     <List.Item as='a' href ='https://github.com/idyllicwanderings/Meats_Database'>Github</List.Item>
                    <List.Item as='a' href ='https://weibo.com/melodyavril/'>Weibo</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Links' />
                  <List link inverted>
                    <List.Item as='a' href={'https://steamcommunity.com/'}>Steam</List.Item>
                    <List.Item as='a' href={'https://www.epicgames.com/'}>Epic</List.Item>
                    <List.Item as='a' href={'https://www.gog.com/'}>GOG</List.Item>
                    <List.Item as='a' href={'https://www.playstation.com/'}>PlayStation</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Copyright BUAA 507' />
                  <Header inverted as ='h5'>
                    ©
                    2020, Meats Games, Inc. All rights reserved. Meats.In China and elsewhere. 纯属雷同，没有巧合。
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Image src='/logo.png' centered size='tiny' />
            <List horizontal inverted divided link size='small'>
              <List.Item as='a' href='https://www.epicgames.com/site/zh-CN/tos'>
                Site Map
              </List.Item>
              <List.Item as='a' href='https://suxiyue18@gmail.com'>
                Contact Us
              </List.Item>
              <List.Item as='a' href='https://www.epicgames.com/site/zh-CN/tos'>
                Terms and Conditions
              </List.Item>
              <List.Item as='a' href='https://www.epicgames.com/site/zh-CN/tos'>
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
}

export default BottomBar