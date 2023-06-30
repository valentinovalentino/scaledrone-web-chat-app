import { Component } from "react";
import React from "react";

class Messages extends Component {
	renderMessage(message) {
		const { member, text } = message;
		const { currentMember } = this.props;
		const messageFromMe = member.id === currentMember.id;
		const className = messageFromMe
			? "messages-message currentMember"
			: "messages-message";
		return (
			<li className={className}>
				<span
					className='avatar'
					style={{ backgroundColor: member.clientData.color }}
				/>{" "}
				<div className='message-content'>
					<div className='username'>{member.clientData.username}</div>{" "}
					<div className='text'>{text}</div>
				</div>
			</li>
		);
	}

	render() {
		const { messages } = this.props;
		return (
			<ul className='messages-list'>
				{messages.map((m) => this.renderMessage(m))}
			</ul>
		);
	}
}

export default Messages;
