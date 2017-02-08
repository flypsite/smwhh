import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
				console.log("initial callback");
				console.log(json.updates);
				self.setStream(self._translateStream(json));  // FIXME: nur Nachrichten von einem Stream anzeigen!
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
			cb(self._translateStream(json));
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
	
	handleScroll(e) {
		var self = this;
		self.timer && clearTimeout(self.timer);
		self.timer = window.setTimeout(
			(function(self1) {						//Self-executing func which takes 'this' as self
				return function() {					//Return a function in the context of 'self'
					self1.scrollStopper(); 		//Thing you wanted to run as non-window 'this'
				}
			}
		)(self), 100);
	}
	scrollStopper() {
		var d = ReactDOM.findDOMNode(this);
		// since width is defined in device units (vw), we have to get the pixel width here:
		var newPos = Math.round(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
		d.scrollLeft = newPos;
		// and use raf/caf for animation...
	}
	
	
	
	render() {
		return (
			<div className="App" onScroll={ this.handleScroll.bind(this) } >
			<FrontPageStream data={this.state} ref={(fpstream) => { this.fpstream = fpstream; }}/>
			</div>
			);
	}
}

export default App;
