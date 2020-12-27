import React from 'react'
import PropTypes from 'prop-types'
import { Modal,Grid,Header, List, Divider,Icon, Input, Label, Form, TextArea, Image, Button, Confirm } from 'semantic-ui-react'
import axios from "axios";

class PublishModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            name: '',
            price: 0,
            imageUrl: '',
            modalOpen: false,
            confirmOpen: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleUpdateGame = this.handleUpdateGame.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalOnClose = this.handleModalOnClose.bind(this)
        this.handleDeleteConfirmOpen = this.handleDeleteConfirmOpen.bind(this)
        this.handleDeleteConfirmCancel = this.handleDeleteConfirmCancel.bind(this)
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this)
    }
     handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleUpdateGame() {
    //send request
        console.log("**********in submit************")
        if(!this.state.category || !this.state.name || !this.state.price || !this.state.imageUrl){
          return
        }

        console.log("avatar: ", this.state.imageUrl);
        let data = {
            g_type: this.state.category,
            game: this.state.name,
            price: this.state.price,
            avatar:"avatar/" + this.state.imageUrl.substring(1, this.state.imageUrl.length),
        };

        let url = 'http://localhost:8000/addGame/';

        console.log("**********begin submit************");
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
        //   axios.post(url, data
        ).then(res=>{
          if(res.status === 200){
              console.log(res.data);
            alert('提交成功。'+res);
              console.log("**********success************");
              // this.props.history.push('/login')
          }
          else{
              console.log("**********fail************");
            console.log(res);
            alert('提交失败：' + res.data.msg);
          }
        })
            this.handleModalOnClose()
        }

    handleModalOpen() {
        this.setState({ modalOpen: true })
    }

    handleModalOnClose() {
        this.setState({ modalOpen: false })
    }

    handleDeleteConfirmOpen() {
        this.setState({ confirmOpen: true })
    }

    handleDeleteConfirmCancel() {
        this.setState({ confirmOpen: false })
    }

    handleDeleteConfirm() {
        this.setState({ modalOpen: false, confirmOpen: false })
    }

    // render() {
    //     const modalTrigger =
    //         <div floated={'center'}>
    //         <Button as='div' floated='center' labelPosition='right' onClick={this.handleModalOpen}>
    //   <Button floated='center' basic color='blue'>
    //     <Icon name='fork' />
    //     Release Your Games
    //   </Button>
    //   <Label as='a' basic color='blue' pointing='left'>
    //    NOW
    //   </Label>
    // </Button>
    //         </div>
    //
    //     return (
    //         <Modal trigger={modalTrigger}
    //                open={this.state.modalOpen}
    //                onOpen = {this.handleModalOpen}
    //                onClose={this.handleModalOnClose}
    //                closeIcon>
    //             <Modal.Header>Publish Your Game</Modal.Header>
    //
    //             <Modal.Content scrolling>
    //                 <Input
    //                     label={{ tag: true, content: 'Category' }}
    //                     labelPosition='right'
    //                     name='category'
    //                     value={this.state.category}
    //                     fluid={true}
    //                     onChange={this.handleOnChange}
    //                 />
    //
    //                 <Divider hidden />
    //
    //                 <Input
    //                     label={{ tag: true, content: 'Game name' }}
    //                     labelPosition='right'
    //                     name='name'
    //                     value={this.state.name}
    //                     fluid={true}
    //                     onChange={this.handleOnChange}
    //                 />
    //
    //                 <Divider hidden />
    //
    //                 <Input
    //                     label={{ tag: true, content: 'Price' }}
    //                     labelPosition='right'
    //                     name='price'
    //                     value={this.state.price}
    //                     fluid={true}
    //                     onChange={this.handleOnChange}
    //                 />
    //
    //
    //                 <Divider hidden />
    //
    //                 {/*<Form>*/}
    //                 {/*    <Label size='large' attached='top right' tag>Game description</Label>*/}
    //                 {/*    <TextArea*/}
    //                 {/*        name='description'*/}
    //                 {/*        value={this.state.description}*/}
    //                 {/*        onChange={this.handleOnChange}*/}
    //                 {/*    />*/}
    //                 {/*</Form>*/}
    //
    //                 <Divider hidden />
    //
    //                 <Input
    //                     label={{ tag: true, content: 'Image URL' }}
    //                     labelPosition='right'
    //                     name='imageUrl'
    //                     value={this.state.imageUrl}
    //                     fluid={true}
    //                     onChange={this.handleOnChange}
    //                 />
    //
    //                 <Divider />
    //
    //                 <Image
    //                     src={this.state.imageUrl}
    //                     size='medium'
    //                     centered={true}
    //                     rounded={true}
    //                 />
    //             </Modal.Content>
    //
    //             <Modal.Actions>
    //                 <Button
    //                     color='gray'
    //                     content='Cancel'
    //                     floated='left'
    //                     onClick={this.handleDeleteConfirmOpen}
    //                 />
    //
    //                 <Confirm
    //                     open={this.state.confirmOpen}
    //                     onConfirm={this.handleDeleteConfirm}
    //                     onCancel={this.handleDeleteConfirmCancel}
    //                     confirmButton='Yes'
    //                 />
    //
    //                 <Button
    //                     primary={true}
    //                     content='Submit'
    //                     onClick={this.handleUpdateGame}
    //                 />
    //             </Modal.Actions>
    //         </Modal>
    //     )
    // }
        render() {


        return (
            <Grid>
            <Grid.Column center style={{
                margin: '3em 3em 6em 25em',
                maxWidth: 450}}>
                <Header inverted  style={{margin:'0em 1em 3em 9em'}}>Publish Your Game</Header>

                    <Input
                        label={{ tag: true, content: 'Category' }}
                        labelPosition='left'
                        name='category'
                        value={this.state.category}
                        fluid={true}
                        onChange={this.handleOnChange}
                    />

                    <Divider hidden />

                    <Input
                        label={{ tag: true, content: 'Game name' }}
                        labelPosition='left'
                        name='name'
                        value={this.state.name}
                        fluid={true}
                        onChange={this.handleOnChange}
                    />

                    <Divider hidden />

                    <Input
                        label={{ tag: true, content: 'Price' }}
                        labelPosition='left'
                        name='price'
                        value={this.state.price}
                        fluid={true}
                        onChange={this.handleOnChange}
                    />



                    {/*<Form>*/}
                    {/*    <Label size='large' attached='top right' tag>Game description</Label>*/}
                    {/*    <TextArea*/}
                    {/*        name='description'*/}
                    {/*        value={this.state.description}*/}
                    {/*        onChange={this.handleOnChange}*/}
                    {/*    />*/}
                    {/*</Form>*/}

                    <Divider hidden />

                    <Input
                        width={'5'}
                        label={{ tag: true, content: 'Image URL' }}
                        labelPosition='left'
                        name='imageUrl'
                        value={this.state.imageUrl}
                        fluid={true}
                        onChange={this.handleOnChange}
                    />

                    <Divider />

                    <Image
                        src={this.state.imageUrl}
                        size='medium'
                        centered={true}
                        rounded={true}
                    />
                    <Button
                        style={{margin:'1em 3em 6em 13em'}}
                        content='Submit'
                        onClick={this.handleUpdateGame}
                    />
            </Grid.Column>
            </Grid>


        )
    }
}


export default PublishModal
