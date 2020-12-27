/* search bar */

import "semantic-ui-css/semantic.min.css"
import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import {Input, Search, Grid, Header, Segment, Modal, Button, Image} from 'semantic-ui-react'
import CustomTable from "./search_result";
import axios from "axios";

/*
  数据库的地方。
 */
const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

const initialState = {
  isLoading: false,
  results: [],
  value: '' }

function AddFriendIcon(name) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Show Modal</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='archive' content='Add new friend' />
      <Modal.Content>
        <p>
          You are adding {name} as a friend, are you sure?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='gray' onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='blue' onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default class FriendSearchBar extends Component {
	state = {
		search: "",
        friends: [],

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
      <Grid inverted left>
        <Grid.Column floated='left' width={3} >
          <Input
              placeholder={"Input your friend's name"}
              onChange={this.handleInputs}
              value={search}
              name={"search"}
              icon={"search"}
              style={{ width: "250px" }}>
          </Input>

            <CustomTable
					headers={["name"]}
					labels={["name"]}
					defaultPages={10}
                    searchQuery = {search}
				/>
        </Grid.Column>
      </Grid>
    )
  }
}
