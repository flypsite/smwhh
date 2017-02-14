import React, { Component } from 'react';
import Message from './Message.js'

class ArticleStream extends Component {

	static contextTypes = { app: React.PropTypes.object }


	setStream(s) {
		this.setState(s);
	}


	load(substream) {

		console.log('load ' + substream.key);

		if ( substream.loading ) return;
		substream.loading = true;

		var self = this;
		//console.log('loading ' + substream.key);
		this.context.app.loadStreamFull(substream.key, function(stream) {
			
			substream.items = stream.items;
			//console.log('success ' + substream.key + " " + substream.items.length);

			var nstate = {
				substream: substream,
				fullstream: stream
			};

			substream.loading = false;
			self.setState(nstate);

		});
	}


	render() {

		if ( ! this.props.showArticle ) return null;

		var substream = this.props.data;
		if ( !substream ) return null; 


		if ( substream.loading ) {
			return <div className="ArticleStream">loading...</div>
		}

		if ( ! substream.items ) {
			this.load(substream);
			return <div className="ArticleStream">loading...</div>
		}


		const listItems = substream.items.map( (item) =>
			<div key={item.id}>
			<Message mode="article" data={ item }/>
			</div>
			);


		return (
			<div className="ArticleStream">
			{ listItems }
			</div>
			);
	}

}

export default ArticleStream;
