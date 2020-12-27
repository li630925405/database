/* layout for store page*/

import "semantic-ui-css/semantic.min.css";

import React from 'react'
import  {Search,Container, Divider, Grid,Button, Header, Icon, Input} from 'semantic-ui-react'
import GameTable from "./game_table";
import SearchGameTable from "./search_gtable";
import axios from "axios";
import TopBar from "../top_bar";
import BottomBar from "../bottom_bar";

class StoreComp extends React.Component
{
    state = {
		search: "",
        games: [],
        haveData: false,
        tmp_search: "",

	};

    componentDidMount = () => {
        let url = 'http://localhost:8000/list_allGames/';
        axios.get(url)
            .then(res => {
                if (res.status === 200) {  // ===
                    console.log("**********success************");
                    // this.state.games = res.data.data; //
                    this.setState({
                        games: res.data.data,
                        haveData: true
                    })
                    console.log(this.state.games);
                } else {
                    console.log("**********fail************");
                    console.log(res);
                    alert('添加失败：' + res.data.msg);
                }
            });
	};

    handleInputs = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});

	};

    render() {
        const { search } = this.state;
        return (
            !this.state.haveData?"loading":(
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
                    <Icon name='game'/>
                    Games Store
                    <Header.Subheader>
                        Have a look at what's popular in your regions.
                    </Header.Subheader>
                </Header>
                <Divider/>

                <TopBar/>

                <Header as='h2' inverted textAlign='center'>
                    THE COMMUNITY RECOMMENDS
                </Header>
                <Divider
                    as='h3'
                    className='header'
                    horizontal
                    inverted
                    style={{textColor: 'FFFFFF', margin: '3em 0em', textTransform: 'uppercase'}}
                > THESE GAMES TODAY
                </Divider>

                <GameTable
                    data={this.state.games}
                    headers={["name"]}
                    labels={["name"]}
                    defaultPages={6}
                />
                {/*写一个滑动窗口*/}

                <Divider
                    as='h3'
                    className='header'
                    horizontal
                    inverted
                    style={{textColor: 'FFFFFF', margin: '3em 0em', textTransform: 'uppercase'}}
                > BROWSE AND SEARCH FOR YOUR GAMES
                </Divider>

               <Grid inverted right>
                    <Grid.Column floated='right' width={4}>
                        <Input
                            placeholder={"Input game's name"}
                            onChange={this.handleInputs.bind(this)}
                            value={search}
                            // name={"tmp_search"}
                            name={"search"}
                            icon={"search"}
                            style={{width: "250px"}}>
                        </Input>
                    </Grid.Column>
                </Grid>

                <SearchGameTable
                    data={this.state.games}
                    defaultPages={4}
                    searchQuery={search}
                />

                {/*<GameDetail />*/}
                {/*<Divider inverted />*/}
                {/*<GameDetail />*/}

                <BottomBar/>
            </Container>
            )
        )
    }
}

export default StoreComp