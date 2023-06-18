import React from "react";
import { Component } from "react";

// klasna komponenta za prikaz teksta upisane poruke
class Input extends Component {
	state = {
		text: "",
	};

	//funkcija klasi postavlja tekst akcije, a okida svaki put kad se promijeni unos
	onChange(e) {
		this.setState({ text: e.target.value });
	}

	//funkcija osigurava akciju jednom,  postavlja prvotno stanje, a upravlja isporukom poruke koju prima od app u razgovor
	onSubmit(e) {
		e.preventDefault();
		this.setState({ text: "" });
		this.props.onSendMessage(this.state.text);
	}

	render() {
		return (
			// forma s poljem za unos teksta i gumbom za poslat tekst u razgovor
			<div className='Input'>
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
