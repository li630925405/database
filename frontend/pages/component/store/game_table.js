import React, { PureComponent } from "react";
import {Image, Button, Icon, Menu, Table, Container} from "semantic-ui-react";

class GameTable extends PureComponent {

	state = {
		page: 0,
		pageSelection: null,
		header: "",
	};

	componentDidMount = () => {
		const { defaultPages } = this.props;
		this.setState({
			pageSelection: [0, defaultPages],
		});
	};

	searchOnData = (query, data) => {
		return data.filter((item) => {
			let obj = {};
			for (let key of Object.keys(item)) {
				obj[key] = item[key];
			}
			for (let key of Object.keys(obj)) {
				try {
					let value = obj[key];
					let re = new RegExp("W*(" + query + ")W*");
					if (re.test(value.toString().toLowerCase())) {
						return true;
					} else if (re.test(value)) {
						return true;
					}
				} catch (e) {
					return false;
				}
			}
			return false;
		});
	};


	handleFooter = (i) => {
		const { defaultPages, data } = this.props;
		const pagesQ = Math.ceil(
			(data).length / defaultPages
		);

		if (i >= 0 && i < pagesQ)
			this.setState({
				pageSelection:
					i === 0 ? [0, defaultPages] : [i * defaultPages, i * defaultPages + defaultPages],
				page: i,
			});
	};

	getData = () => {
		const { data} = this.props;
		const { pageSelection, header } = this.state;
		let _data = data || [];
		if (pageSelection) _data = _data.slice(...pageSelection);
		return _data;
	};

	renderData = () => {
		const { labels } = this.props;
		const _data = this.getData();

		// return (
		// 	<Table.Body>
		// 		{(_data || []).map((item, index) => (
		// 			<Table.Row key={index}>
		// 				{(labels || []).map((label, index) => (
		// 					<Table.Cell key={index}>
		// 						<div>{item[label] || ""}
		// 						<Button size='small' color={'teal'} floated={'right'} onClick={this.handleAdd(index)}> Add</Button>
		// 						</div>
		// 					</Table.Cell>
		// 				))}
		// 			</Table.Row>
		// 		))}
		// 	</Table.Body>
		// );

		return (
			<Table.Body inverted celled='internally' columns={3}>
				<Table.Row>
					{(_data.slice(0, 3) || []).map((item, index) => (
							<Table.Cell key={index}>
								<Image floated = 'center' size="medium" src={item.fields.avatar.substring(6, item.fields.avatar.length)} />
							</Table.Cell>

					))}
				</Table.Row>
				<Table.Row>
				{(_data.slice(3, 6) || []).map((item, index) => (
						<Table.Cell key={index}>
							<Image floated = 'center' size="medium" src={item.fields.avatar.substring(6, item.fields.avatar.length)} />
						</Table.Cell>

				))}
				</Table.Row>
			</Table.Body>
		)
	};

	renderFotter = () => {
		const { defaultPages, labels, data } = this.props;
		const { page } = this.state;
		const pagesQ = Math.ceil(
			(data).length / (defaultPages || 10)
		);

		let pages = [];

		for (let i = 1; i <= pagesQ; i++) {
			pages = [...pages, i];
		}

		return (
			<Table.Footer style={{ backgroundColor: "#252839" }}>
				<Table.Row >
					<Table.HeaderCell colSpan={3} style={{ backgroundColor: "#252839" }}>
						<Menu inverted floated="right" pagination>
							<Menu.Item  as="a" icon floated="right"
										style={{ backgroundColor: "#252839" }}
										onClick={() => this.handleFooter(page - 1)}>
								    <Icon color='teal' name ='chevron circle left' size={'big'} />
							</Menu.Item>
							{pages.map((item, index) => {
								return (
									<Menu.Item
										inverted
										key={index}
										style={item - 1 === page ? { backgroundColor: "teal" } : {backgroundColor: "#252839" }}
										as="a"
										onClick={() => this.handleFooter(item - 1)}
									>
										{item}
									</Menu.Item>
								);
							})}
							<Menu.Item inverted
									   as="a" icon floated="right"
									   style={{ backgroundColor: "#252839" }}
									   onClick={() => this.handleFooter(page + 1)}>
								 <Icon color='teal' name ='chevron circle right'  size={'big'} />
							</Menu.Item>
						</Menu>
					</Table.HeaderCell>
				</Table.Row>
			</Table.Footer>
		);
	};

	render() {
		return (
			<Table celled = 'internally'
			style={{ backgroundColor: "#252839" }}
			>
				{this.renderData()}
				{this.renderFotter()}
			</Table>
		);
	}
}

export default GameTable;