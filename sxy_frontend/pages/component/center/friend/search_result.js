import React, { PureComponent } from "react";
import  { Image, Button, Icon, Menu, Table } from "semantic-ui-react";
import axios from "axios";

class CustomTable extends PureComponent {
	constructor(props) {
		super(props);
        this.state = {
		page: 0,
		pageSelection: null,
		searchQuery: "",
		header: "",
		data: [],
	};
        this.handleAdd = this.handleAdd.bind(this);
    }

	handleAdd = (name) => {
		//unfinished
		//send following request
		let url = 'http://localhost:8000/addFriend/';
        let data = {target: name};
        console.log("?????", name);
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
            if(res.status === 200){
            	console.log("button???");
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
				let data = {target: searchQuery}
				let url = 'http://localhost:8000/list_nameUser/';
				// get不能传参数 但post可以返回结果?
				axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
				).then(res => {
					if(res.status === 200){
						console.log("res", res);
						// this.state.data = res.data.data;
						this.setState({
							data: res.data.data || [],
						})
						console.log("**********success************");
					}
					else{
						console.log("**********fail************");
						console.log(res);
					}
				});
			}
		}
		// this.setState({
		// 	data: this.state.data,
		// })
	};

	renderHeaders = () => {
		const { headers } = this.props;
		return (
			<Table.Header>
				<Table.Row>
					{(headers || []).map((item, index) => (
						<Table.HeaderCell key={index} >
							<div>
								<div>{item}</div>
							</div>
						</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
		);
	};

	handleFooter = (i) => {
		const { defaultPages, searchQuery } = this.props;
		const pagesQ = Math.ceil(this.state.data.length) / defaultPages;
		if (i >= 0 && i < pagesQ)
			this.setState({
				pageSelection:
					i === 0 ? [0, defaultPages] : [i * defaultPages, i * defaultPages + defaultPages],
				page: i,
			});
	};

	getData = () => {
		const { pageSelection } = this.state;
		let _data = this.state.data || [];
		if (pageSelection) _data = _data.slice(...pageSelection);
		return _data;
	};

	renderData = () => {
		const { labels } = ['name'];
		const _data = this.getData();

		return (
			<Table.Body>
				{(_data || []).map((item, index) => (
					<Table.Row key={index}>
						<div>
							 {item.fields.name || ""}
							 <Button size='small' color={'teal'} floated={'right'} onClick={()=>this.handleAdd(item.fields.name)}> Add</Button>
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
		return (
			<Table celled>
				{this.renderHeaders()}
				{this.renderData()}
				{this.renderFooter()}
			</Table>
		);
	}
}

export default CustomTable;