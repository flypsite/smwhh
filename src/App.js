import React, { Component } from 'react';
import logo from './logo.svg';
import FrontPageStream from './comp/FrontPageStream.js';
import './App.css';
import Pusher from 'pusher-js';
import Vienna from './vienna.module.js';


class App extends Component {

	constructor(props) {

		super(props);

		// local streams cache
		this.streams = { };

		this.messages = { };


		var self = this;
//		Pusher.log = function(m) {
//			console.log("Pusher > ", m);
//		}
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

		this.vienna = v;

		v.connect({
			initial: function(json) { 
				console.log("initial callback with", json);
				self.processInitial(json);
//				console.log(json.updates);
//				self.setStream(self._translateStream(json));  // FIXME: nur Nachrichten von einem Stream anzeigen!
			},
			update: function(json) { 
				console.log("update callback " + json.updates[0].message.text);
				console.log(json.updates);
			},
			command: function(json) {
				console.log("command callback"); 
			}
		});

		var md = false;

	}


	processInitial(json) {



	}



	processUpdates() {

	}





	// magic: make the app avail in every child... (not in stable!)
	// https://www.ctheu.com/2015/02/12/how-to-communicate-between-react-components/
	getChildContext() {
    	// it exposes one property "xy", any of the components that are
    	// rendered inside it will be able to access it
    	return { app: this };
  	}

	// we declare the context
  	static childContextTypes = {
    	app: React.PropTypes.object
  	}

  	propTypes: {
		t: React.PropTypes.func.isRequired,
	}

	setStream(s) {
		this.setState(s);
	}


	loadStreamFull(sname, cb) {
		var self = this;
		this.vienna.requestStreamAscending(sname, 0, 1024, function(json) {

			console.log("loaded stream ", json);
			var tstream = self._translateStream(json);
			this.streams[json.stream] = tstream;

			cb(tstream);
		});
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
			media: m.media,
			substream: m.substream
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
	
		return (
			<div className="App">
			<FrontPageStream data={this.state} />
			</div>
			);
	}
}

export default App;
