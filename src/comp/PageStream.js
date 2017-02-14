import React, { Component } from 'react';
import Message from './Message.js'
import TweenMax, {Power1, Power2, Sine} from 'gsap';

class PageStream extends Component {

	static contextTypes = { app: React.PropTypes.object }


	setStream(s) {
		this.setState(s);
	}


	load(substream) {
		if ( substream.loading ) return;
		substream.loading = true;

		var self = this;
		this.context.app.loadStreamFull(substream.key, function(stream) {
			
			substream.items = stream.items;
			var nstate = {
				substream: substream,
				fullstream: stream
			};

			substream.loading = false;
			self.setState(nstate);

		});
	}
	
	gotoSlide(index) {
		// getting the frontpagestream as component instance
		var ref = this.context.app.maincomp;
		ref.goToIndex(index);
	}


	render() {
		var self = this;
		var substream = this.props.data;
		this.sizes = [[1,2],[1,1],[1,1],[2,1],[2,1],[1,1],[1,1],[1,2],[1,1],[1,1],[2,1],[2,1],[1,1],[1,1],[1,2],[1,1],[1,1],[2,1],[2,1],[1,1],[1,1]];
		if ( !substream ) return null; 


		if ( substream.loading ) {
			return <div className="PageStream">loading...</div>
		}

		if ( ! substream.items ) {
			this.load(substream);
			return <div className="PageStream">loading...</div>
		}

		const listItems = substream.items.map( (item, index) =>
			(self.props.pkey !== item.id) && 
			<div key={item.id} className={ item.message.style } style={ function(s) {return {height: (s[1] * 100/4) + "vh", width: (s[0] * 50) + "%"}}(self.sizes.shift())} onClick={ function() {self.gotoSlide(index) } }>
				<Message mode="fullpage" data={ item }/>
			</div> 
		);


		return (
			<div className="PageStream" ref={(elem) => { this.DOMNode = elem; }}>
			{ listItems }
			</div>
		);
	}

}

export default PageStream;
