import {Button, Header, Icon, Image, Modal, Segment} from "semantic-ui-react";
import React from "react";
import axios from "axios";

class PlayModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
		    open : false,
	};

        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalOnClose = this.handleModalOnClose.bind(this)
        this.handlePlay =this.handlePlay.bind(this)
    }

	handleModalOpen() {
        this.setState({ open: true })
    }

    handleModalOnClose() {
        this.setState({ open: false })
    }

    handlePlay = () => {
        // send request 每次玩10%
        let data = {
            gamename: this.props.name,
            progress: 1,
        };
        let url = 'http://localhost:8000/progress/';
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
            ).then(res=>{
                if(res.status === 200){
                    console.log(res.data);
                    alert('添加成功。'+res);
                    console.log("**********success************");
                }
                else{
                    console.log("**********fail************");
                    console.log(res);
                    alert('添加失败：' + res.data.msg);
                }
            })
        this.handleModalOnClose();
    }

    render() {
        return (
            <Modal
                basic
                onClose={this.handleModalOnClose}
                onOpen={this.handleModalOpen}
                open={this.state.open}
                trigger={<Button floated='right' color='teal' onClick={this.handlePlay}>
                    Play
                    <Icon name='right chevron'/>
                </Button>}
            >
                <Header icon>
                    <Icon name='archive'/>
                    Game Notice
                </Header>
                <Modal.Content>
                    <p>
                        You played 10% of the game.
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

export default PlayModal