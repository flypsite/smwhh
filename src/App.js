import React, { Component } from 'react';
import logo from './logo.svg';
import FrontPageStream from './comp/FrontPageStream.js';
import TestStream from './teststream.js'
import './App.css';
import Pusher from 'pusher';
// import Vienna from './vienna.module.js';

class App extends Component {

	constructor(props) {

		super(props);


	// init everything here

	var self = this;
	window.setTimeout( function() {
		TestStream.items = TestStream.updates;
		self.setStream( self._translateStream(TestStream) );
	}, 3000);


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
			signature: false
		}

		return nm;
	}


	_translateStream(s) {

		var self = this;

		var newitems = s.items.map( function(item) {
			return self._tmsg(item);
		});

		return {
			stream: s.stream,
			items: newitems
		};


	}



	setStream(s) {
		this.setState(s);
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
			<FrontPageStream data={this.state}/>
			</div>
			);
	}
}

export default App;
