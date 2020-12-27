import {Button, Header, Input, Icon, Image, Modal, Segment, Grid} from "semantic-ui-react";
import React from "react";
import axios from "axios";

class ReviewModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // category: '',
            // name: '',
            // price: 0,
            // imageUrl: '',
            open : false,
            grade: 5,
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalOnClose = this.handleModalOnClose.bind(this)
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

	handleModalOpen() {
        this.setState({ open: true })
    }

    handleModalOnClose() {
        this.setState({ open: false })
    }

    handleReview = () => {
        this.handleModalOnClose();
    }


    handleSubmit = () => {
        //back end
        let data = {
            gamename: this.props.name,
            grade: this.state.grade,
        };
        let url = 'http://localhost:8000/grade/';
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
            ).then(res=>{
                if(res.status === 200){
                    console.log(res.data);
                    alert('评价成功。'+res);
                    console.log("**********success************");
                }
                else{
                    console.log("**********fail************");
                    console.log(res);
                    alert('评价失败：' + res.data.msg);
                }
            })
    }

    render() {
        return (
            <Modal
                basic
                onClose={this.handleModalOnClose}
                onOpen={this.handleModalOpen}
                open={this.state.open}
                trigger={<Button floated='right' color='teal' onClick={this.handleReview}>
                    Review
                    <Icon name='right chevron'/>
                </Button>}
            >
                <Header icon>
                    <Icon name='archive'/>
                    Game Notice
                </Header>
                <Modal.Content>
                    <p>
                        Input a number(From 1 to 5) to review on this game.
                    </p>
                    <Input
                        label={{ tag: true, content: 'Stars' }}
                        labelPosition='left'
                        name='grade'
                        value={this.state.grade}
                        fluid={true}
                        onChange={this.handleOnChange}
                    />

                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={this.handleSubmit}>
                        <Icon name='checkmark'/> Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ReviewModal