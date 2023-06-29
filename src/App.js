import "./style.css"; // stylesheet
import Messages from "./Messages"; // render messages
import React, { Component } from "react";
import Input from "./Input"; // render input

// funkcija za dodjelu imena korisniku dodaje ime tako da spoji pridjev, i imenicu iz liste
function randomName() {
	const adjectives = [
		"autumn",
		"hidden",
		"bitter",
		"misty",
		"silent",
		"empty",
		"dry",
		"dark",
		"summer",
		"icy",
		"delicate",
		"quiet",
		"white",
		"cool",
		"spring",
		"winter",
		"patient",
		"twilight",
		"dawn",
		"crimson",
		"wispy",
		"weathered",
		"blue",
		"billowing",
		"broken",
		"cold",
		"damp",
		"falling",
		"frosty",
		"green",
		"long",
		"late",
		"lingering",
		"bold",
		"little",
		"morning",
		"muddy",
		"old",
		"red",
		"rough",
		"still",
		"small",
		"sparkling",
		"throbbing",
		"shy",
		"wandering",
		"withered",
		"wild",
		"black",
		"young",
		"holy",
		"solitary",
		"fragrant",
		"aged",
		"snowy",
		"proud",
		"floral",
		"restless",
		"divine",
		"polished",
		"ancient",
		"purple",
		"lively",
		"nameless",
	];
	const nouns = [
		"waterfall",
		"river",
		"breeze",
		"moon",
		"rain",
		"wind",
		"sea",
		"morning",
		"snow",
		"lake",
		"sunset",
		"pine",
		"shadow",
		"leaf",
		"dawn",
		"glitter",
		"forest",
		"hill",
		"cloud",
		"meadow",
		"sun",
		"glade",
		"bird",
		"brook",
		"butterfly",
		"bush",
		"dew",
		"dust",
		"field",
		"fire",
		"flower",
		"firefly",
		"feather",
		"grass",
		"haze",
		"mountain",
		"night",
		"pond",
		"darkness",
		"snowflake",
		"silence",
		"sound",
		"sky",
		"shape",
		"surf",
		"thunder",
		"violet",
		"water",
		"wildflower",
		"wave",
		"water",
		"resonance",
		"sun",
		"wood",
		"dream",
		"cherry",
		"tree",
		"fog",
		"frost",
		"voice",
		"paper",
		"frog",
		"smoke",
		"star",
	];
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return adjective + noun;
}

// funkcija za dodjelu boje, i identifikacijskog broja odabirom hex broja koji se zatim pretvori u string
function randomColor() {
	return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
	// konstruktor klase, Scaledrone hook
	constructor() {
		super();
		// globalni window objekt Scaledrone channel ID za prikaz Scaledrone instance povezan sa skriptom u html zaglavlju
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
		const room = this.drone.subscribe("observable-room"); // spajanje na sobu (grupu korisnika), naziv je proizvoljan nakon prefiksadtaa observable-

		// prepoznaje pristiglu poruku povezivanjem na "data" akciju u sobi
		room.on("data", (data, member) => {
			const messages = this.state.messages;
			messages.push({ member, text: data });
			this.setState({ messages });
		});
	}

	// inicijalizirano stanje
	state = {
		messages: [
			/*{
				text: "This is a test message!",
				member: {
					color: "blue",
					username: "bluemoon",
				},
			},
			// test stanja prikaza poruke*/
		],
		member: {
			username: randomName(),
			color: randomColor(),
		},
	};

	onSendMessage = (message) => {
		/*const messages = this.state.messages;
		messages.push({ text: [], member: this.state.member });
		this.setState({ messages: messages });*/

		// modificirana funkcija za prikaz poruke koja prilikom pristizanja poruke dodaje tekst i podatke o klijentu u stanje
		// bitno je primijetiti Scaledrone publish funkciju
		this.drone.publish({
			room: "observable-room",
			message,
		});
	};

	render() {
		return (
			<div className='app'>
				{/**div, i klasa za CSS stiliziranje naslova   */}
				<div className='header'>
					{" "}
					<h1>BUBBLEGUMCHATAPP</h1>
				</div>
				<Messages
					messages={this.state.messages}
					currentMember={this.state.member}
				/>
				{/* prikaz komponente Input */}
				<Input onSendMessage={this.onSendMessage} />{" "}
				<code>My webchat scaledrone app</code>
			</div>
		);
	}
}

export default App;
