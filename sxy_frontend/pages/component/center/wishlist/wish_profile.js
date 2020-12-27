/* game details */

import "semantic-ui-css/semantic.min.css";
import React from 'react'
import { Button, Icon,Rating, Image, Item, Label } from 'semantic-ui-react'
import axios from "axios";
import BuyModal from "../../store/buy_modal";

class GameItem extends React.Component {
        props = {
            // type: '',
            // name: '',
            // price: '',
            // WishList: 0,
            // pubtime: '',
            // avatar: '',
            // n_comments: 0,
            // developer: 0,
        };

    handleDel = (name) => {
		let url = 'http://localhost:8000/delDreamList/';
        let data = {name: name};
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
            if(res.status === 200){
            	console.log("button???");
                alert('删除成功。'+res);
                console.log("**********success************");
            }
            else{
                console.log("**********fail************");
                console.log(res);
                alert('删除失败：' + res.data.msg);
            }
        });
	};

    render() {
        console.log("props: ", this.props);
        return (<Item.Group
            inverted divided>
            <Item>
                <Item.Image src={this.props.avatar.substring(6, this.props.avatar.length)}/>

                <Item.Content inverted>
                    <Item.Header as='a'>{this.props.name}</Item.Header>
                    <Item.Meta>
                        <span className='cinema'>Published by {this.props.developer} on {this.props.pubtime}</span>
                    </Item.Meta>
                    <Item.Extra>
                     <Rating icon='star' defaultRating={this.props.grade} maxRating={5} disabled />
                     </Item.Extra>
                    <Item.Extra>
                        <BuyModal name={this.props.name}/>
                        <Button size='small' color={'teal'} floated={'right'} onClick={()=>this.handleDel(this.props.name)}> Delete<Icon name='right chevron'/> </Button>
                        <Label>{this.props.type}</Label>
                        <Label icon='globe' content={ "price:" + this.props.price} />
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>)

    }
}

export default GameItem
