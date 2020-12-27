import {Button, Header, Icon, Image, Modal, Segment} from "semantic-ui-react";
import React from "react";
import axios from "axios";

class WishlistModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
		open : false,
	};

        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalOnClose = this.handleModalOnClose.bind(this)
        this.handleBuyGames =this.handleWishList.bind(this)
    }


	handleModalOpen() {
        this.setState({ open: true })
    }

    handleModalOnClose() {
        this.setState({ open: false })
    }

    handleWishList = () => {
        let url = 'http://localhost:8000/addDreamList/';
        let data = {name: this.props.name};
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
            if(res.status === 200){
                alert('添加成功。'+res);
                console.log("**********success************");
            }
            else{
                console.log("**********fail************");
                console.log(res);
                alert('添加失败：' + res.data.msg);
            }
        });
    }

    render() {

        return (
            <Modal
                basic
                onClose={this.handleModalOnClose}
                onOpen={this.handleModalOpen}
                open={this.state.open}
                trigger={<Button floated='right' color='teal' onClick={this.handleWishList}>
                    Add To WishList
                    <Icon name='right chevron'/>
                </Button>}
            >
                <Header icon>
                    <Icon name='archive'/>
                    Notice
                </Header>
                <Modal.Content>
                    <p>
                        Congratulations! A new game is added to your wishlist.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={this.handleModalOnClose}>
                        <Icon name='checkmark'/> Okay
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default WishlistModal