import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

var TweenMax = require("gsap");

class FrontPageStream extends Component {

	static contextTypes = { app: React.PropTypes.object }

	constructor(props) {
		super(props);
		this.state = { 
			selectedPage: 0, 
			lastIDX: 0, 
			lastFucktor: null, 
			animating: false,
			x: 0,
			y: 0
		};
	}


	scrolled(idx) {
		//console.log("scrolled called.");
		var sp = this.state.selectedPage;
		if ( sp === idx ) return;

		console.log("scrolled to " + idx);
		this.setState({ selectedPage: idx, lastIDX: sp });
	}
	
	
	scrollStopper() {

		/*	
		var d = this.DOMNode;
		var newPos = Math.round(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
	
		if(this.state.selectedPage != Math.round(d.scrollLeft / d.offsetWidth) ) {
			this.scrolled(Math.round(d.scrollLeft / d.offsetWidth));
		}
		
		//TweenMax.to(d, 0.2, { scrollLeft: newPos, onComplete:self.resetOldScrollAndAnimation() });

		this.setState({animating: true});
		*/
		
	}
	
	resetOldScroll() {
		//console.log("resetOldScroll")
		var d = this.DOMNode;
		var self = this;
		
		if(this.state.selectedPage !== Math.round(d.scrollLeft / d.offsetWidth) ) {
			this.scrolled(Math.round(d.scrollLeft / d.offsetWidth));
		}
		
		
		if(d.children[0].children[this.state.lastIDX]) d.children[0].children[self.state.lastIDX].scrollTop = 0;
	}



	handleClick() {
		console.log("handleClick", this.DOMNode.offsetWidth);
	}
	
	handleScroll(e) {
		//console.log("handleTouchMove", this.DOMNode);	
	}


	handleMouseDown() {
		//console.log("handleMouseDown", this);
	}

	handleMove() {
		//console.log("handleMove");		
	}
	
	handleTouchStart(e) {
		/*
		console.log(e.touches[0].screenX);
		this.dragStartX = e.touches[0].screenX;
		this.dx = this.DOMNode.scrollLeft;
		console.log("handleTouchStart", this.dragStartX, this.dx);	

		var c = e.currentTarget.children[0];
		console.log("c", c.offsetLeft);
		*/
	}
	
	handleTouchMove(e) {
		//console.log("handleTouchMove", e.touches[0].screenX, this.DOMNode.scrollLeft);	
		//this.DOMNode.style = {left:e.touches[0].clientX};
		//this.lastClientX = e.touches[0].screenX;		
	}


	handleTouchEnd(e) {	
		var self = this;

		var d = this.DOMNode;
		var newPos = Math.round(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
		//console.log("handleTouchEnd newPos", newPos);
		
		/*
		// jetzt im callback...
		if(this.state.selectedPage !== Math.round(d.scrollLeft / d.offsetWidth) ) {
			this.scrolled(Math.round(d.scrollLeft / d.offsetWidth));
		}
		*/
		
		TweenMax.to(d, 0.2, { scrollLeft: newPos, onComplete:self.resetOldScroll.bind(self) });
		//TweenMax.to(d, 3, { scrollLeft: newPos, onComplete:self.resetOldScroll.bind(self) });
		
	}
	


	render() {

		var self = this;
		var stream = this.props.data;

		if ( ! stream ) {
			return <div>loading...</div>
		}



		const listItems = stream.items.map( function(item, index) {

			console.log("render page " + index + " showArticle=" + (index === self.state.selectedPage) + " sub=" + item.message.substream );

			return (
				<div id={item.id} key={item.id} className={item.message.style}>
					<Message key={item.id} mode="frontpages" data={ item } />
					<ArticleStream data={ item.message.substream } showArticle={ index === self.state.selectedPage }/>
				</div> 
			)

		});

		// onScroll={ this.handleScroll.bind(this) }

		return (
				<div className="FrontPageStream" 					
					onTouchStart={this.handleTouchStart.bind(this)} 
					onTouchMove={this.handleTouchMove.bind(this)} 
					onTouchEnd={this.handleTouchEnd.bind(this)} 
					onMouseMove={this.handleMove.bind(this)} 
					onMouseDown={this.handleMouseDown.bind(this)} 
					onClick={this.handleClick.bind(this)} 
					onScroll={this.handleScroll.bind(this)}
					ref={(elem) => { this.DOMNode = elem; }}>
				
				<div className="FrontPageStreamItems" 
					style={ {width: listItems.length * document.documentElement.offsetWidth + "px"} } >
					
					{ listItems }
				</div>
			</div>
		);
	}

}

export default FrontPageStream;
