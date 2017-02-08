import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

import TweenMax from 'gsap'

class FrontPageStream extends Component {

	static contextTypes = { app: React.PropTypes.object }

	constructor(props) {
		super(props);
		this.state = { selectedPage: -1 };
	}

	scrolled(idx) {
		var sp = this.state.selectedPage;
		if ( sp == idx ) return;
		this.setState({ selectedPage: idx });
	}


	handleScroll(e) {
		console.log("handleScroll");		
		var self = this;
		self.timer && clearTimeout(self.timer);

		self.timer = window.setTimeout(
			(function(self1) {					//Self-executing func which takes 'this' as self
				return function() {				//Return a function in the context of 'self'
					self1.scrollStopper(); 		//Thing you wanted to run as non-window 'this'
				}
			}
		)(self), 100);
	}
	
	
	scrollStopper() {
	
		var d = this.DOMNode;
		// since width is defined in device units (vw), we have to get the pixel width here:
		var newPos = Math.round(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
		
		console.log("selectedPage? ", this.state.selectedPage, Math.round(d.scrollLeft / d.offsetWidth) );		
	
		if(this.state.selectedPage != Math.round(d.scrollLeft / d.offsetWidth) ) {
			this.scrolled(Math.round(d.scrollLeft / d.offsetWidth));
		}
		
		//d.scrollLeft = newPos;
		TweenMax.to(d, 0.2, { scrollLeft: newPos });
	}
	


	render() {

		var self = this;
		var stream = this.props.data;

		if ( ! stream ) {
			return <div>loading...</div>
		}




		const listItems = stream.items.map( function(item, index) {

			return (
				<div id={item.id} key={item.id} className={item.style}>
					<Message key={item.id} mode="frontpages" data={ item } />
					<ArticleStream data={ item.substream } showArticle={ index == self.state.selectedPage }/>
				</div> 
			)

		});

		return (
			<div id="Hans" onScroll={ this.handleScroll.bind(this) } ref={(elem) => { this.DOMNode = elem; }}>
					<div className="FrontPageStream" style={ {width: listItems.length * document.documentElement.offsetWidth + "px"} } >
						{ listItems }
					</div>
				</div>
		);
	}

}

export default FrontPageStream;
