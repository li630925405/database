/* game details */

import "semantic-ui-css/semantic.min.css";
import React from 'react'
import { Button, Icon,Rating, Image, Item, Label } from 'semantic-ui-react'
import axios from "axios";
import PlayModal from "./play_modal";
import ReviewModal from "./review_modal";


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
                    <Item.Description>Progress : {this.props.progress}%</Item.Description>
                    <Item.Extra>
                     <Rating icon='star' defaultRating={this.props.grade} maxRating={5} disabled />
                     </Item.Extra>
                    <Item.Extra>
                        <PlayModal name={this.props.name}/>
                        <ReviewModal name={this.props.name}></ReviewModal>
                        <Label>{this.props.type}</Label>
                        <Label icon='globe' content={ "price:" + this.props.price} />
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Item.Group>)

    }
}

export default GameItem
