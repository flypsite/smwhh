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

		this.state = { frontstream: null };

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
		if ( ! this.streams[sn] ) this.streams[sn] = {};

		var so = this.streams[sn];
		if ( so[e.id] ) { // evelope exists
			var enew = this._tmsg(e);
			so[e.id].message = enew.message;
		} else { // new envelope
			so[e.id] = this._tmsg(e);
		}

	}


	processInitial(json) {

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

		var sitems = this.streams['out1'];
		var ns = [ ];

		for ( var k in sitems ) {
			ns.push(sitems[k]);
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
			user: m.user,
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
			<FrontPageStream data={this.state.frontstream} />
			</div>
			);
	}
}

export default App;
