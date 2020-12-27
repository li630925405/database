import React, { PureComponent } from "react";
import { Button, Icon, Menu, Table } from "semantic-ui-react";
import axios from "axios";
import GameProfile from "./game_profile";

class PlayTable extends PureComponent {
	state = {
		page: 0,
		pageSelection: null,
		data: [],
		game_details: [],
		all_games: [],
	};

	componentDidMount = () => {
		const { defaultPages } = this.props;
		this.setState({
			pageSelection: [0, defaultPages],
		});
		let url = 'http://localhost:8000/list_play/';
		// get不能传参数 但post可以返回结果?
		axios.get(url, {headers: {'Content-Type': 'application/json'}}
		).then(res => {
			if(res.status === 200){
				// this.state.data = res.data.data;
				this.setState({
					game_details: res.data.data || [],
				});
				console.log("**********success************");
				console.log(res);
			}
			else{
				console.log("**********fail************");
				console.log(res);
			}
		});

		url = 'http://localhost:8000/list_allGames/';
		// get不能传参数 但post可以返回结果?
		axios.get(url, {headers: {'Content-Type': 'application/json'}}
		).then(res => {
			if(res.status === 200){
				// this.state.data = res.data.data;
				this.setState({
					all_games: res.data.data || [],
				});
				console.log("**********success************");
			}
			else{
				console.log("**********fail************");
				console.log(res);
			}
		});
	};

	extractGameInfo = () => {
		let name = "";
		let game = "";
		let l1 = this.state.all_games.length;
		let l2 = this.state.game_details.length;
		// console.log("names:::::", this.state.game_details);
		if (l1 > 0 && l2 > 0) {
			for (let i = 0; i < l1; i++) {
				for (let j = 0; j < l2; j++) {
					game = this.state.all_games[i];
					name = this.state.game_details[j].fields.game;
					if (game.fields.name === name) {
						console.log("game:::::", game);
						let grade = this.state.game_details[j].fields.rate;
						let progress = this.state.game_details[j].fields.progress;
						game['grade'] = grade;
						game['progress'] = progress;
						this.state.data = [...this.state.data, game]
					}
				}
			}
		}
		console.log("data!!!!", this.state.data);
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
		console.log(_data[0]);
		return (
			<Table.Body>
				{(_data || []).map((item, index) => (
					<Table.Row>
							<Table.Cell>
								{console.log("item: ", item)}
								<GameProfile type={item.fields.type} name={item.fields.name} price={item.fields.price} grade={item.grade}
 								pubtime={item.fields.pubtime} avatar={item.fields.avatar} n_comments={item.fields.n_comments} progress={parseInt(item.progress)*10} />
 								</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		);
	};

	renderFooter = () => {
		const { defaultPages} = this.props;
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
		{this.extractGameInfo()}
		return (
			<Table celled>
				{this.renderData()}
				{this.renderFooter()}
			</Table>
		);
	}
}

export default PlayTable;