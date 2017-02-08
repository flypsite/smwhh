import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

import TweenMax from 'gsap'

class FrontPageStream extends Component {

	static contextTypes = { app: React.PropTypes.object }


	constructor(props) {
		super(props);
		this.state = { selectedPage: -1, lastIDX: 0, lastFucktor: null, animating: false };
	}

	scrolled(idx) {
		var sp = this.state.selectedPage;
		if ( sp == idx ) return;
		this.setState({ selectedPage: idx, lastIDX: sp });
	}




	handleScroll(e) {
		var currFucktor = e.target.scrollLeft / e.target.offsetWidth;
		if(!this.state.lastFucktor) {
			this.setState({lastFucktor: currFucktor});
			return;
		}
		console.log("handleScroll", currFucktor, this.state.lastFucktor);
		
		var diff = currFucktor === this.lastFucktor ? 0 : currFucktor > this.state.lastFucktor ? currFucktor - this.state.lastFucktor : this.state.lastFucktor - currFucktor;
		
		console.log(diff);
		
		
		this.setState({lastFucktor: currFucktor});
		
		
		if(diff === 0) return;
		
		
		if(diff < 0.01) {
			console.log("GO!");
			this.lastFucktor = null;
			this.scrollStopper();
		}
		
		
		return; // for now;
		
		
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
	
		//if(this.state.animating === true) return;
	
		var self = this;
		
		var d = this.DOMNode;
		// since width is defined in device units (vw), we have to get the pixel width here:
		var newPos = Math.round(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
	
		if(this.state.selectedPage != Math.round(d.scrollLeft / d.offsetWidth) ) {
			this.scrolled(Math.round(d.scrollLeft / d.offsetWidth));
		}
		
		TweenMax.to(d, 0.2, { scrollLeft: newPos, onComplete:self.resetOldScrollAndAnimation() });

		this.setState({animating: true});
		
	}
	
	resetOldScrollAndAnimation() {
		this.setState({animating: false})
		var d = this.DOMNode;
		var self = this;
		if(d.children[0].children[this.state.lastIDX]) d.children[0].children[self.state.lastIDX].scrollTop = 0;
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
			<div id="FrontPageStreamScrollContainer" onScroll={ this.handleScroll.bind(this) } ref={(elem) => { this.DOMNode = elem; }}>
				<div className="FrontPageStream" style={ {width: listItems.length * document.documentElement.offsetWidth + "px"} } >
					{ listItems }
				</div>
			</div>
		);
	}

}

export default FrontPageStream;
