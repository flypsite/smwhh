import React, { Component } from 'react';
import logo from './logo.svg';
import FrontPageStream from './comp/FrontPageStream.js';
import TestStream from './teststream.js'
import './App.css';
import Pusher from 'pusher-js';
import Vienna from './vienna.module.js';

class App extends Component {

	constructor(props) {

		super(props);


		// init everything here

		var self = this;
		Pusher.log = function(m) {
			console.log("Pusher > ", m);
		}
	/*
		var p = new Pusher("3bd9f270de4a9ca0cc78");
		p.connection.bind('connected', function() {
				console.log("Pusherc")
		});
	*/
	
		var v = new Vienna("Q1IFrJLioN1C", { 
			pusher: Pusher,
			pusherkey: "3bd9f270de4a9ca0cc78", 
			url: "//flypsite.appspot.com" ,
			mode: "poll"
		});
		v.connect({
			initial: function(json) { 
				console.log("initial callback");
				console.log(json.updates);
				self.setStream(self._translateStream(json));
			},
			update: function(json) { 
				console.log("update callback " + json.updates[0].message.text);
				console.log(json.updates);
			},
			command: function(json) {
				console.log("command callback"); 
			}
		});
	}
  
	setStream(s) {
		this.setState(s);
	}

	_tmsg(e) {

		var m = e.message;
		if ( ! m ) return { id: e.id, index: e.index, stream: e.stream };

		var nm = {
			id: e.id,
			index: e.index,
			stream: e.stream,
			layout: m.layout,
			style: m.style,
			headline: m.headline,
			text: m.text,
			info: m.info,
			signature: false,
			media: m.media
		}



		return nm;
	}


	_translateStream(s) {

		var self = this;

		var itms = s.items;
		if ( ! itms ) itms = s.updates;


		var newitems = itms.map( function(item) {
			return self._tmsg(item);
		});

		return {
			stream: s.stream,
			items: newitems
		};


	}

	render() {

		console.log("app.render()")
		// var p = new Pusher({

		// });

		return (
			<div className="App">
			<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Welcome to #smwhh</h2>
			</div>
			<FrontPageStream data={this.state} ref={(fpstream) => { this.fpstream = fpstream; }}/>
			</div>
			);
	}
}

export default App;
