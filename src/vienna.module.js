(function(root, factory) {

  /*if (typeof define === 'function' && define.amd) {
    define([], function() {
      return factory(root);
    });
  } else */if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.Vienna = factory(root);
  }

}(this, function(root) {
  

	// ========================================================
	// static
	// ========================================================

	var API_VERSION = "v1";

  // ### Vienna class constructor
  function Vienna (token, opts) {
		var self = this;

		self.token = token;
		flog("New Vienna: Client Token is " + token);

		if ( ! opts ) opts = { };
		
		self.url = opts.url ? opts.url : "//flypsite.appspot.com"

		// detect vienna / Rio
		self.isVienna = true;

		// set revision to below zero
		self.revision = -1;

		// no commit availabel yet, will be set from carrier
		self.commit   = null;

		// the userid
		self.user = "no-user-id";

		// nickname
		self.nick = "anonymous";

		// mode : poll or pusher. can be overridden by first.json
		self.mode = opts.mode ? opts.mode : "poll";

		// key for pusher app
		self.pusherkey = opts.pusherkey ? opts.pusherkey : null;

		// base for all endpoints
		var urlbase = self.url + "/" + API_VERSION + "/" + self.token;

		// carrier url for first query
		self.firstEndpoint = urlbase + "/first.json"

		// check for flypid in cookie
		self.ackEndpoint = urlbase + "/ack.json"

		// carrier url for polling state
		self.carrierEndpoint = urlbase + "/carrier.json"

		// transmit pusher.com socket id
		self.socketEndpoint = urlbase + "/pusher.json"

		// heartbeat
		self.heartbeatEndpoint = urlbase + "/beat.json"

		// carrier url for initial data
		self.initialEndpoint = urlbase + "/initial.json"

		// carrier url for initial data
		self.updateEndpoint = urlbase + "/u"

		// carrier url for initial data
		self.streamsEndpoint = urlbase + "/s"

		// carrier url for initial data
		self.chatEndpoint = urlbase + "/chat.json"

		// carrier url for initial data
		self.pollEndpoint = urlbase + "/poll.json"

		// CORS stuff, see end of this file
		// $_.support.cors = true;  //FIXMEJQ
  }
  


	// ========================================================
	// prototype
	// ========================================================
	
	// alias
	var proto = Vienna.prototype;

	// user id
	proto.uuid = "NYI";

	proto.getUUID = function() {
		return this.uuid;
	};

	proto.debug = function(msg, args) {
		flog(msg,args);
		if ( this.debugCallback ) {
			this.debugCallback(msg, args);
		}
	}

	proto._postEvent = function(evt, args) {
		flog(evt,args);
		if ( this.eventCallback ) {
			this.eventCallback(evt, args);
		}
	}

	proto.disconnect = function() {

	}

	/**
	 *	Public Connect function
	 */
	proto.connect = function(args) {
		
		var self = this;
		if ( this.connected ) return;

		if ( args ) {

			if ( typeof args.initial === 'function' ) {
				this.initialCallback = args.initial;
			}

			if ( typeof args.update === 'function' ) {
				this.updateCallback = args.update;
			}

			if ( typeof args.command === 'function' ) {
				this.commandCallback = args.command;
			}

			if ( typeof args.event === 'function' ) {
				this.eventCallback = args.event;
			}

			if ( typeof args.debug === 'function' ) {
				this.debugCallback = args.debug;
			}

		}

		self.debug("connect called", args);



		this._requestWithoutCache (

			this.firstEndpoint, 
			null,

			// success
			function(fj) { 

				self.eventid   = fj.eventid;
				self.revision  = fj.revision;
				self.commit    = fj.commit;
				self.mode      = fj.mode ? fj.mode : self.mode;
				self.nick      = fj.nick;
				if ( ! self.pusherkey ) self.pusherkey = fj.pusherkey;

				self.debug("got first.json with revision " + self.revision, fj);

				if ( fj.ackuser ) {
					self._acknowledge(fj);
				} else {
					self.user = fj.user;
					self._postEvent("connect", fj);
					self._requestInitial(fj);
				}
			}, 
			// error
			function (fj) {

			}
		);
	}

	proto._acknowledge = function(fj) {

		var self = this;
		self.debug("acknowlege user id");

		this._requestWithoutCache (
			this.ackEndpoint, 
			"u=" + fj.user,
			function(ack) { 
				self.user = ack.user;
				fj.user = ack.user;
				self._postEvent("connect", fj);
				self._requestInitial(fj);
			} 
		);

	}

	proto._requestInitial = function() {

		var self = this;

		self.debug("request initial data");
		this._requestWithCommit (
			this.initialEndpoint, 
			function(data) { 
				self.debug("request initial data: success", data);
				if ( self.initialCallback ) self.initialCallback(data);
				self._postEvent("initial", data);
				self._startUpdates();
			} 
		);

	}

	proto._startUpdates = function() {

		var self = this;
		self.debug("update with mode " + self.mode);

		setTimeout(
			function () {
				self._heartbeat(23000);
			},  7000);

		if ( self.mode == "pusher" ) {
			self._pusherUpdates();
		} else if ( self.mode == "poll" ) {
			self.poll();
		} else {
			self.mode = "pusher"
			self._pusherUpdates();
		}
	}


	proto._heartbeat = function(timeout) {

		var self = this;
		self._requestWithoutCache(self.heartbeatEndpoint, "u=" + self.user);

		setTimeout(
			function () {
					self._heartbeat(timeout < 30000 ? 30000 : 60000);
				},  timeout);
	}


	proto._pusherUpdates = function() {

		var self = this;
		self.debug("_pusherUpdates");


		this.pusher = new root.Pusher(self.pusherkey);
		
		this.pusher.connection.bind('connected', function() {
  			self.pushersocket = self.pusher.connection.socket_id;
  			self._sendSocketId();
		});
		
		this.pusher.connection.bind('state_change', function(states) {
			// connection anzeige
			self._postEvent("pusherstate", { current: states.current } )
  			// states = {previous: 'oldState', current: 'newState'}
  			// console.log("State Change  " + states.previous + " == " + states.current);
  			// $('div#status').text("Pusher's current state is " + states.current);
  			// self.wsblock.attr("title", states.current);
		});
		
		this.pusher.connection.bind( 'error', function( err ) { 

    		if( err.error && err.error.data && err.error.data.code === 4004 ) {
				//console.log('>>> detected limit error');
				self.poll();
				return;
  			}
  			if( err.error && err.error.data && err.error.data.code === 4005 ) {
				// console.log('>>> detected conection error');
				self.poll();
				return;
  			}

		});
		
    	var channel = this.pusher.subscribe('event' + self.eventid);
    	self.debug("bind to " + 'event' + self.eventid);
    	
    	channel.bind('update', function(data) {
    		// console.log("New Message: ", data);
      		// alert(data.message);
      		self.revision = data.revision;
			self.updateRevision = self.revision;
			if ( self.updateCallback ) self.updateCallback(data);
    		self._postEvent("update", data);
    	});

	}


	proto._sendSocketId = function() {

		var self = this;
		var data = {
			user: self.user, 
			socket: self.pushersocket
		};

		self._postData(self.socketEndpoint, data);
	
	}



	proto.poll = function() {

		var self = this;
		if ( ! self.interval ) self.interval = 124000;
		flog("poll...");

		if ( self.polling ) return;
		self.polling = true;
		
		var r = ajax(self.carrierEndpoint + "?" + random(8) + ".r" + self.revision, {

			processData: true,
			dataType: 'json',
			type: 'GET',
			success: function(json) {
				flog("carrier rev = " + json.revision);
				self.debug("carrier: " + json);
				if ( json.revision > self.revision ) {
					try {
						self._postEvent("poll", json);
						self._gotoRevision(json.revision, json.commit);
					} catch(e) {
						flog(e);
					} 
				} else {
					self._postEvent("poll", json);
				}
			},
			complete: function(jqxhr, textStatus) {
				if ( self.interval < 7000 ) self.interval = 7000;
				flog("set poll timeout " + self.interval);
				setTimeout(function () {
					self.polling = false;
					self.poll();
				}, self.interval);
			}
		});


	}


	proto._gotoRevision = function(targetRevision) {

		var self = this;

		var nextRevision = self.revision + 1;
		if ( nextRevision > targetRevision ) {

			return;
		}

		var uprev = pad((nextRevision & 0xff).toString(16), 4);
		var endpoint = self.updateEndpoint + "/" + uprev + "/update.json?" + self.commit;

		flog("get update " + endpoint);

		ajax(endpoint, {
			success: function(json) {
				flog("got revision: " + nextRevision);
				if ( self.updateCallback ) self.updateCallback(json);
				self._postEvent("update", json);
				self.revision = nextRevision;
				self._gotoRevision(targetRevision);
			}
		});

	}


	//stream, type, commitcode, cback, dataForCallback, errorCallback
	proto.requestInitial = function(stream, type, commitcode, cback, dataForCallback, errorCallback) {

		var self = this;

		self.debug("request initial data for stream " + stream);
		this._requestWithCommit (
			this.streamsEndpoint + "/" + stream + "/initial.json",
			function(data) { 
				self.debug("request initial data: success", data);
				//if ( data.updates ) data.items = data.updates;
				if ( cback ) cback(data, dataForCallback);
			} 
		);



	};

	proto.requestMore = function(stream, type, cm, pos, nitems, cb, dataForCb) {

		//console.log("requestMore for " + stream +" from " + pos, "?" , cb);
		this.requestEnvelopesDesc(stream, pos, nitems, function(json) {
			cb(json, dataForCb);
		});

	};

	proto.requestStreamAscending = function(stream, firstIndex, nitems, callback, errorcb, cbdata) {
		var endpoint = this.streamsEndpoint + "/" + stream + "/" + firstIndex + "/" + nitems + "/asc.json";
		this._requestWithCommit(endpoint, callback, errorcb, cbdata);
	}

	proto.requestStreamDescending = function(stream, firstIndex, nitems, callback, errorcb, cbdata) {
		var endpoint = this.streamsEndpoint + "/" + stream + "/" + firstIndex + "/" + nitems + "/desc.json";
		this._requestWithCommit(endpoint, callback, errorcb, cbdata);
	}


	// deprecated
	proto.requestEnvelopesAsc = function(stream, firstIndex, nitems, callback) {
		// endpoint/<first>/<num>/desc.json
		var endpoint = this.streamsEndpoint + "/" + stream + "/" + firstIndex + "/" + nitems + "/asc.json";
		this._requestWithCommit(endpoint, callback);
	}

	// deprecated
	proto.requestEnvelopesDesc = function(stream, firstIndex, nitems, callback) {
		// endpoint/<first>/<num>/desc.json
		var endpoint = this.streamsEndpoint + "/" + stream + "/" + firstIndex + "/" + nitems + "/desc.json";
		this._requestWithCommit(endpoint, callback);
	}

	proto.sendPollCommit = function(data, cback, obj) {

		var sendData = data;
	    sendData.userkey = this.user;//Rio.UUID;
	    ajax({
	    	processData: true,
	        type: 'POST',
	        url: this.pollEndpoint,
	        dataType: 'json',
	        data: JSON.stringify(sendData),
   	        xhrFields: {
    			withCredentials: true
			},
	        success: function(){
	            if(undefined != cback && cback instanceof Function){
	                cback(data.did, data.oid);
	            }
	        },
	        error: function(a, b, c){
	           /*
	           console.log('push poll error'); 
	           console.log(a);
	           console.log(b);
	           console.log(c);
	        	*/
	        }
	    })
	}



	proto.postMessage = function(message, callback, errorcb, cbdata) {
		var self = this;
	    message.userkey = self.user;
	    self._postData(this.chatEndpoint, message, callback, errorcb, cbdata);
	}

	// deprecated
	proto.sendChatCommit = function(data, cback, obj) {
		var self = this;

	    data.userkey = self.user;
	    self._postData(this.chatEndpoint, data, cback, null, obj);
	}

	proto._postData = function(endpoint, data, callback, errorcb, cbdata) {

		var self = this;

	    ajax({

	    	processData: true,
	        type: 'POST',
	        url: endpoint,
	        dataType: 'json',
	        data: JSON.stringify(data), 
	        xhrFields: {
    			withCredentials: true
			},
	        success: function(json, textStatus, jqxhr){
	            if(undefined != callback && callback instanceof Function) {
	            	callback(json, cbdata);
	            }
	        },
	        error: function(jqxhr, status, exception) {
				flog(exception);
				if ( errorcb ) errorcb(status, exception);
			}
	    })
	}


	proto._requestWithCommit = function(endpoint, callback, errorcb, cbdata) {

		var self = this;
		var ep = endpoint + "?" + this.commit;

		self.debug("_requestWithCommit", ep);
		var r = ajax(ep, {

			processData: true,
			dataType: 'json',
			type: 'GET',

			success: function(json, textStatus, jqxhr) {
				if ( callback ) {
					//console.log("2", callback);
					if ( json.updates && !json.items ) json.items = json.updates;
					
					callback(json, cbdata);
				}
			},
			error: function(jqxhr, status, exception) {
				flog(exception);
				if ( errorcb ) errorcb(status, exception);
			}
		});
		
	}


	proto._requestWithoutCache = function(endpoint, arg, callback, errorcb, cbdata) {

		var self = this;

		var ep = endpoint + "?" + random(8);
		if ( arg ) ep += "&" + arg;

		self.debug("_requestWithoutCache", ep);
		var r = ajax(ep, {

			processData: true,
			dataType: 'json',
			type: 'GET',
			xhrFields: {
  				withCredentials: true
  			},

			success: function(json, textStatus, jqxhr) {
				if ( callback ) callback(json, cbdata);
			},
			error: function(jqxhr, status, exception) {
				flog(exception);
				if ( errorcb ) errorcb(status, exception, cbdata);
			}
		});
		
	}	



	/*
	 * logging function
	 */
	function flog() {
		// tmp raus...
		return;
		if ( arguments.length == 1 ) {
			console.log(arguments[0]);
		} else {
			console.log(arguments);
		}
		
	}

	/*
	 * generate a string of random characters
	 */
	function random(digits) {

	    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		var text = "";
	    for( var i=0; i < digits; i++ ) {
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }

	    return text;
		
	};


	/*
	 * padd a string with a given character (0)
	 */
	function pad(value, len, padchar) {
		var sb = value ? value : '';
		var pc = padchar ? padchar : "0";
		var ln = len > 0 ? len : 0;

		for (var i = value.length; i < ln; i++)
		{
			sb = pc + sb;
		}

		return sb;
	}
	
	function ajax (urlobj, setgs)  {
	  // no JSONP
	  // only GET and POST
	  // no xdomain-support for IE8/9 yet
	  // walkthrough: http://blog.garstasio.com/you-dont-need-jquery/ajax/
	  
		var xhr = new XMLHttpRequest();
		var type = "GET", url = urlobj, cors = false, data;
		
		if (typeof urlobj === "object") {
		  type = urlobj.type;
		  url  = urlobj.url;
		  data = urlobj.data;
		  cors = typeof urlobj.xhrFields === "object";
		}
		xhr.open(type, url);
		if (type === "POST") xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		if (cors) xhr.withCredentials = true;
		xhr.onload = function() {
			if (xhr.status === 200) {
				setgs.success(JSON.parse(xhr.responseText));
			} else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send(data);
	}


  return Vienna;
}));
