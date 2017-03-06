import React, { Component } from 'react';
import Message from './Message.js'

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
		this.context.app.maincomp.goToIndex(index);
	}

	componentWillMount() {
		var substream = this.props.data;
		if ( !substream ) return null; 
		if ( substream.loading ) {
			return <div className="PageStream">loading...</div>
		}
		if ( ! substream.items ) {
			this.load(substream);
			return <div className="PageStream">loading...</div>
		}	
	}
	render() {
		var self = this;
		var substream = this.props.data;
		if ( !substream || !substream.items || substream.items.length === 0) return null; 

		this.sizes = [[1,2],[1,1],[1,1],[2,1],[2,1],[1,1],[1,1],[1,2],[1,1],[1,1],[2,1],[2,1],[1,1],[1,1],[1,2],[1,1],[1,1],[2,1],[2,1],[1,1],[1,1]];

		const listItems = substream.items.map( (item, index) =>
			(self.props.pkey !== item.id) && 
			<div key={item.id} className={ item.message.style } style={ function(s) {return {height: (s[1] * 100/4) + "vh", width: (s[0] * 50) + "%"}}(self.sizes.shift())} onClick={ function() {self.gotoSlide(index) } }>
				<Message mode="tiles" data={ item }/>
			</div> 
		);


		return (
			<div className="PageStream">
			{ listItems }
			</div>
		);
	}

}

export default PageStream;
