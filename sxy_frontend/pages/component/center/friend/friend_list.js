import React, { PureComponent } from "react";
import { Button, Icon, Menu, Table } from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css"
import _ from 'lodash'
import faker from 'faker'

export default class FriendList extends PureComponent {

	state = {
		page: 0,
		pageSelection: null,
		data: [],
		all_friends: [],
	};

	handleDelete = (name) => {
		//unfinished
		//send delete request
		let url = 'http://localhost:8000/delFriend/';
        let data = {target: name};
        console.log("?????", name);
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

	componentDidMount = () => {
		const { defaultPages } = this.props;
		this.setState({
			pageSelection: [0, defaultPages],
		});
		let url = 'http://localhost:8000/list_Friends1/';
		// get不能传参数 但post可以返回结果?
		axios.get(url, {headers: {'Content-Type': 'application/json'}}
		).then(res => {
			if(res.status === 200){
				// this.state.data = res.data.data;
				this.setState({
					all_friends: res.data.data || [],
				});
				console.log("********** FUCK  success************");
				console.log(res);
			}
			else{
				console.log("**********fail************");
				console.log(res);
			}
		});
	};

	extractFriendInfo = () => {
		this.state.data = [];
		let name = "";
		let l1 = this.state.all_friends.length;
		if (l1 > 0 ) {
			for (let i = 0; i < l1; i++) {
				name = this.state.all_friends[i].fields.player2;
				console.log("YOUR NAME" +name);
				this.state.data = [...this.state.data, name]
			}
		}
		console.log("data!!!!:", this.state.data);
    }

	handleFooter = (i) => {
		const { defaultPages, data} = this.props;
		const pagesQ = Math.ceil(this.state.data.length) / defaultPages;
		if (i >= 0 && i < pagesQ)
			this.setState({
				pageSelection:
					i === 0 ? [0, defaultPages] : [i * defaultPages, i * defaultPages + defaultPages],
				page: i,
			});
	};

	getData = () => {
		const { pageSelection} = this.state;
		let _data = this.state.data || [];
		if (pageSelection) _data = _data.slice(...pageSelection);
		return _data;
	};

	renderData = () => {
		const _data = this.getData();
		console.log("FUCK IT"+_data[0]);
		return (
			<Table.Body>
				{(_data || []).map((item, index) => (
					<Table.Row key={index}>
						<div>
							 {item || ""}
							 <Button size='tiny'
									 color={'teal'}
									 floated={'right'}
									 onClick={()=>this.handleDelete(item)}>
								 Delete</Button>
							 {/*<Button size='small' color={'teal'} floated={'right'} onClick={()=>this.handleDel(index)}> Delete</Button>*/}
						</div>

					</Table.Row>
				))}
			</Table.Body>
		);
	};

	renderFooter = () => {
		const { defaultPages } = this.props;
		const { page } = this.state;
		const pagesQ = Math.ceil(this.state.data.length / (defaultPages || 10));

		let pages = [];

		for (let i = 1; i <= pagesQ; i++) {
			pages = [...pages, i];
		}

		return (
			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell colSpan={1}>
						<Menu floated="right" pagination>
							<Menu.Item as="a" icon onClick={() => this.handleFooter(page - 1)}>
								<Icon name="chevron left" />
							</Menu.Item>
							{pages.map((item, index) => {
								return (
									<Menu.Item
										key={index}
										style={item - 1 === page ? { backgroundColor: "#e5e5e5" } : {}}
										as="a"
										onClick={() => this.handleFooter(item - 1)}
									>
										{item}
									</Menu.Item>
								);
							})}
							<Menu.Item as="a" icon onClick={() => this.handleFooter(page + 1)}>
								<Icon name="chevron right" />
							</Menu.Item>
						</Menu>
					</Table.HeaderCell>
				</Table.Row>
			</Table.Footer>
		);
	};

	render() {
		{this.extractFriendInfo()}
		return (
			<Table celled>
				{this.renderData()}
				{this.renderFooter()}
			</Table>
		);
	}
}
