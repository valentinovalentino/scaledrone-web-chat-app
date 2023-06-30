import React from "react";
import { Component } from "react";

class Input extends Component {
	state = {
		text: "",
	};

	onChange(e) {
		this.setState({ text: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.onSendMessage(this.state.text);
		this.setState({ text: "" });
	}

	render() {
		return (
			<div className='input'>
				<form onSubmit={(e) => this.onSubmit(e)}>
					<input
						onChange={(e) => this.onChange(e)}
						value={this.state.text}
						type='text'
						placeholder='GUMCHAT poruka'
						autoFocus='true'
					/>
					<button>CHAT</button>
				</form>
			</div>
		);
	}
}

export default Input;
