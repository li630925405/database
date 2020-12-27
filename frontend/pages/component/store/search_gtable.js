import React, { PureComponent } from "react";
import { Button, Icon, Menu, Table } from "semantic-ui-react";
import GameItem from "./game_detail";
import axios from "axios";

class SearchGameTable extends PureComponent {

	state = {
		page: 0,
		pageSelection: null,
		searchQuery: "",
		data: this.props.data,
	};

	handleAdd = (name) => {
		//unfinished
		//send following request
		let url = 'http://localhost:8000/addDreamList/';
        let data = {name: name};
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
	};

	componentDidMount = () => {
		const { defaultPages } = this.props;
		this.setState({
			pageSelection: [0, defaultPages],
		});
	};

	componentDidUpdate = () => {
		const { searchQuery, defaultPages } = this.props;
		if (searchQuery) {
			if (this.state.searchQuery !== searchQuery) {
				this.setState({
					searchQuery: searchQuery,
					pageSelection: [0, defaultPages],
					page: 0,
				});
				let data = {game: searchQuery}
				let url = 'http://localhost:8000/list_nameGames/';
				// get不能传参数 但post可以返回结果?
				axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
				).then(res => {
					if(res.status === 200){
						console.log("res", res);
						// this.state.data = res.data.data;
						this.setState({
							data: res.data.data,
						})
						console.log("**********success************");
					}
					else{
						console.log("**********fail************");
						console.log(res);
					}
				});
				console.log(this.state.data);
			}
		}
		// this.forceUpdate();
	};

	// searchOnData = (query) => {
	// 	//request back end = search on data
	// 	// 返回过滤后的data
	//
	// };

	handleFooter = (i) => {
		const { defaultPages, data, searchQuery } = this.props;
		const pagesQ = Math.ceil(this.state.data.length) / defaultPages;
		if (i >= 0 && i < pagesQ)
			this.setState({
				pageSelection:
					i === 0 ? [0, defaultPages] : [i * defaultPages, i * defaultPages + defaultPages],
				page: i,
			});
	};

	getData = () => {
		// const { data, searchQuery } = this.props;
		const { pageSelection, header } = this.state;
		let _data = this.state.data || [];
		// if (searchQuery) _data = this.searchOnData(searchQuery);
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
								{console.log(parseInt(item.fields.price))}
                                 <GameItem type={item.fields.type} name={item.fields.name} price={item.fields.price} grade={parseInt(item.fields.grade)}
								pubtime={item.fields.pubtime}  avatar={item.fields.avatar} n_comments={item.fields.n_comments} developer={item.fields.developer} />
								</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		);
	};

	renderFooter = () => {
		const { defaultPages, data, searchQuery } = this.props;
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
		return (
			<Table celled>
				{this.renderData()}
				{this.renderFooter()}
			</Table>
		);
	}
}

export default SearchGameTable;