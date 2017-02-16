import React, { Component } from 'react';
import FrontPageStream from './comp/FrontPageStream.js';
import './App.css';
import Pusher from 'pusher-js';
import Vienna from './vienna.module.js';


class App extends Component {

	constructor(props) {

		super(props);

		// local streams cache
		this.streams = { };

		this.state = { frontstream: null, mediaPlaying: null  };

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
	
		// LIVE
		
// 		var v = new Vienna("9I2l1HbA7iWs", { 
// 			pusher: Pusher,
// 			pusherkey: "3bd9f270de4a9ca0cc78", 
// 			url: "//flypsite.appspot.com" ,
// 			mode: "poll"
// 		});	
		
		// DEV
		
		var v = new Vienna("2wqFJd7vV3oY", { 
			url: "//aerobic-polygon-88015.appspot.com" ,
			pusher: Pusher,
			pusherkey: "0708e5675118ddb0be11", 
			mode: "poll"
		}); 
		
		this.vienna = v;

		v.connect({
			initial: function(json) { 
				console.log("initial callback with", json);
				self.processInitial(json);
			},
			update: function(json) { 
				console.log("update callback with ", json);
				self.processUpdates(json);
			},
			command: function(json) {
				console.log("command callback"); 
			}
		});

		

	}


	updateEnvelope(e) {
		
		var sn = e.stream; // stream-name
		if ( ! this.streams[sn] ) return; // this.streams[sn] = {};

		var so = this.streams[sn];
		if ( so[e.id] ) { // evelope exists
			var enew = this._tmsg(e);
			so[e.id].message = enew.message;
		} else { // new envelope
			so[e.id] = this._tmsg(e);
		}

	}


	processInitial(json) {

		this.streams['out1'] = { };

		var items = json.items;
		for ( var i = 0; i < items.length; i++ ) {
			this.updateEnvelope(items[i]);
		}

		this.setStream( this.getStream("out1") );

	}



	processUpdates(json) {

		var items = json.updates;
		for ( var i = 0; i < items.length; i++ ) {
			this.updateEnvelope(items[i]);
		}

		this.setStream( this.getStream("out1") );

	}

	setStream(s) {
		console.log("setstream", s);
		this.setState({ frontstream: s });
	}


	getStream(name) {

		var sitems = this.streams[name];
		var ns = [ ];

		for ( var k in sitems ) {
			if(sitems.hasOwnProperty(k)) {
				ns.push(sitems[k]);
			}
		}

		ns.sort(function(a,b) {
			return a.index - b.index;
		});

		return {
			stream: name,
			items: ns
		}
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
  };

  propTypes: { t: React.PropTypes.func.isRequired };
	


	loadStreamFull(sname, cb) {

		var self = this;

		if ( this.streams[sname] ) {
			cb(self.getStream(sname));
			return;
		}

		this.streams[sname] = { };


		this.vienna.requestStreamAscending(sname, 0, 1024, function(json) {

			console.log("loaded stream ", json);
			
			json.items.map(function(item) {
				return self.updateEnvelope(item);
			});

			cb(self.getStream(sname));
			// console.log("loaded stream ", json);
			// var tstream = self._translateStream(json);
			// this.streams[json.stream] = tstream;

			// cb(tstream);
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
			user: m.user,
			created: "Tue, 14 Feb 2017 12:37:45 +0100",
			substream: m.substream
		}

		var ne = {
			id: e.id,
			index: e.index,
			stream: e.stream,
			message: nm
		}

		return ne;

	}



	render() {
	
		return (
			<div className="App">
			<FrontPageStream data={this.state.frontstream} ref={(maincomp) => {this.maincomp = maincomp}} />
			</div>
			);
	}
}

export default App;
