import React from "react";
import Proptypes from "prop-types";

export default class Fields extends React.Component {
	constructor() {
		super();
		this.state = {
			anInput: "",
			list: [""]
		};
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/nyarbouh")
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.log("Bad response");
				}
			})
			.then(data => {
				this.setState({ list: data });
			})
			.catch(error => console.log(error));
	}
	deleteTodo(e) {
		this.setState({
			list: this.state.list.filter(index => index.list !== e)
		});
	}
	render() {
		let arr = this.state.list.map((blue, index) => {
			return (
				<li key={index}>
					<i
						className="far fa-trash-alt"
						onClick={() => this.deleteTodo(index.list)}
					/>
					{blue.label}
				</li>
			);
		});

		return (
			<div className="fields">
				<input
					placeholder="Enter task"
					onChange={e => this.setState({ anInput: e.target.value })}
					onKeyUp={e =>
						e.keyCode == 13
							? this.setState({
									list: this.state.list.concat(
										this.state.anInput
									)
							  })
							: null
					}
				/>

				<ul className="list-group">{arr}</ul>
				<div className="footer">
					<p>
						You have&nbsp;
						{this.state.list.length}
						&nbsp;tasks to get done
					</p>
				</div>
			</div>
		);
	}
}
