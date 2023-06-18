import { Component } from "react";
import React from "react";
// klasna komponenta za poruku

class Messages extends Component {
	// funkcija za poruku
	render() {
		//varijabla mapa poruka koje proslijedimo
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
				<span
					className='avatar'
					style={{ backgroundColor: member /*.clientData*/.color }}
				/>{" "}
				{/* scaledrone clientData sidro za boju korisnika */}
				<div className='Message-content'>
					<div className='username'>{member /*.clientData*/.username}</div>{" "}
					{/* scaledrone clientData sidro na korisnikovo ime */}
					<div className='text'>{text}</div>
				</div>
			</li>
		);
	}
}

export default Messages;

//ova komponenta prima prop od app komponente i koristi se za prikaz poruke u razgovoru
