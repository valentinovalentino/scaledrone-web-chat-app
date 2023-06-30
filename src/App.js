import "./style.css";
import Messages from "./Messages";
import React, { Component } from "react";
import Input from "./Input";
import { randomName, randomColor } from "./util";

class App extends Component {
	constructor() {
		super();

		this.drone = new window.Scaledrone("bDsnt3dL2kTUHT3l", {
			data: this.state.member,
		});
		this.drone.on("open", (error) => {
			if (error) {
				return console.error(error);
			}
			const member = { ...this.state.member };
			member.id = this.drone.clientId;
			this.setState({ member });
		});
		const room = this.drone.subscribe("observable-room");

		room.on("data", (data, member) => {
			const messages = this.state.messages;
			messages.push({ member, text: data });
			this.setState({ messages });
		});
	}

	state = {
		messages: [],
		member: {
			username: randomName(),
			color: randomColor(),
		},
	};

	onSendMessage = (message) => {
		this.drone.publish({
			room: "observable-room",
			message,
		});
	};

	render() {
		return (
			<div className='app'>
				<div className='header'>
					{" "}
					<h1>BUBBLEGUMCHATAPP</h1>
				</div>
				<Messages
					messages={this.state.messages}
					currentMember={this.state.member}
				/>
				<Input onSendMessage={this.onSendMessage} />{" "}
				<code>My webchat scaledrone app</code>
			</div>
		);
	}
}

export default App;
