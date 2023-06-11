import { Component } from "react";
import React from "react";
// klasna komponenta za poruku

class Messages extends Component {
	// funkcija za poruku
	render() {
		//varjabla mapa poruka koje proslijedimo
		const { messages } = this.props;
		return (
			//lista poruka koje stvaramo u mapu
			<ul className='Messages-list'>
				{messages.map((m) => this.renderMessage(m))}
			</ul>
		);
	}

	// funkcija u komponenti za listu za svaku poruku s imenom, avatarom, i tekstom poruke
	renderMessage(message) {
		const { member, text } = message;
		const { currentMember } = this.props;
		const messageFromMe = member.id === currentMember.id;
		const className = messageFromMe
			? "Messages-message currentMember"
			: "Messages-message";
		return (
			<li className={className}>
				<span className='avatar' style={{ backgroundColor: member.color }} />
				<div className='Message-content'>
					<div className='username'>{member.username}</div>
					<div className='text'>{text}</div>
				</div>
			</li>
		);
	}
}

export default Messages;

//ova komponenta prima prop od app komponente i koristi se za prikaz poruke u razgovoru
