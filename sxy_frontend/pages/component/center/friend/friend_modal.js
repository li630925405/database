/* modal scrolling example for Friend List & other infos*/

/*
* This includes:
*  the list of your friends
*  add friend(one - way)
*  delete friend (one-way)
*
 */

import "semantic-ui-css/semantic.min.css"
import React,{Component} from 'react'
import {Segment, Button, Header, Image, Modal, Icon, List, Grid, Table} from 'semantic-ui-react'
import FriendSearchBar from "./friend_search";
import FriendList from "./friend_list";
import axios from "axios";

// const ListFloated = (e) => (
//   <Table>
//     {(e || []).map((item, index) => (
//         <Table.Row key={index}>
//           {(labels || []).map((label, index) => (
//               <Table.Cell key={index}>
//                 <div>{item[label] || ""}  <Button floated ='right' size={'small'} onClick={this.handleDelete(index)}>Delete</Button></div>
//               </Table.Cell>
//           ))}
//         </Table.Row>
//     ))}
//   </Table>
// )

class FriendModal extends Component{
	 constructor(props) {
        super(props)
        this.state = {
            searchQuery: "",
            header: "",
            open : false,
            friends: props.friends,

        };

        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalOnClose = this.handleModalOnClose.bind(this)
    }

    handleModalOpen() {
        this.setState({ open: true })
    }

    handleModalOnClose() {
        this.setState({ open: false })
    }

	handleDelete = (name) => {
		//send following request
		let data = {name: name};
        let url = 'http://localhost:8000/delFriend/';
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
            ).then(res=>{
                if(res.status === 200){
                    console.log(res.data);
                    alert('删除成功。'+res);
                    console.log("**********success************");
                }
                else{
                    console.log("**********fail************");
                    console.log(res);
                    alert('删除失败：' + res.data.msg);
                }
            })
	}


  render() {
    return (
        <Modal
            onClose={this.handleModalOnClose}
			onOpen ={this.handleModalOpen}
            open={this.state.open}
            trigger={<Button icon='Group' size={'large'}>Friend List</Button>}
        >
          <Modal.Header>Friends & Community</Modal.Header>
          <Modal.Content image>
            <Image size='big' src='/friends.jpg' wrapped/>
            <Modal.Description>
              <Header>Your Friends Here</Header>
                <FriendList/>

              {/*<Segment inserted={'left'}>*/}
                {/*<Table>*/}
                    {/*{console.log(this.state.friends)}*/}
                    {/*{(this.state.friends || []).map((item, index) => (*/}
                        {/*<Table.Row key={index}>*/}
                          {/*<Table.Cell>*/}
                              {/*<div>*/}
                                {/*{item.fields.player2 || ""}*/}
                                {/*<Button floated ='right' size={'small'} onClick={this.handleDelete(item.fields.player2)}>Delete</Button>*/}
                              {/*</div>*/}
                              {/*</Table.Cell>*/}
                        {/*</Table.Row>*/}
                    {/*))}*/}
                {/*</Table>*/}
              {/*</Segment>*/}

              <Header>Find Your Friends</Header>
              <Segment inserted={'left'}>
                <FriendSearchBar/>
              </Segment>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='teal' onClick={this.handleModalOnClose}>
              Exit
            </Button>

          </Modal.Actions>
        </Modal>
    )
  }
}

export default FriendModal

