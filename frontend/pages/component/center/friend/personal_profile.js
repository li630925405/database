/* personal profile */

/*
* This includes:
*  Your aviator
*  Your name
*  Player/Developer
*  Game Numbers you bought/published
*  Number of Your Wishlists
 */

import "semantic-ui-css/semantic.min.css"
import React,{Component} from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import FriendModal from "./friend_modal";
import axios from "axios";

class PersonalProfile extends Component {
    // 写到construct里就最开始为空??
    state = {
        name: "",
        friends: [],
    };

    componentDidMount = () => {
        console.log("!!!!!!!!!!!!")
        let url = 'http://localhost:8000/get_curUser/';
        axios.get(url, {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
            if(res.status === 200){
                console.log("**********success************");
                console.log(res);
                this.setState({
                    name: res.data.data[0].fields.name,
                    // isDeveloper: res.data.data[0].fields.isDeveloper,
                })
            }
            else{
                console.log("**********fail************");
                console.log(res);
            }
        });

        url = 'http://localhost:8000/list_Friends1/';
        axios.get(url)
            .then(res => {
                if (res.status === 200) {  // ===
                    console.log("**********success************");
                    this.setState({
                        friends: res.data.data,
                    })
                    console.log(this.state.friends);
                } else {
                    console.log("**********fail************");
                    console.log(res);
                }
            });
    };

    render() {
        {console.log(this.state)}
        return (
            <Card size='small'>
                <Image src='/user.png' size='small' wrapped
                       ui={false}/>
                <Card.Content>
                    <Card.Header> {this.state.name}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        {(this.state.friends || []).length} Friends
                        <FriendModal friends={this.state.friends}/>
                    </a>
                </Card.Content>
            </Card>
        )
    }
}

export default PersonalProfile


