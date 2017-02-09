import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

//import TweenMax from 'gsap'

//import GSAP from 'react-gsap-enhancer'
var TweenMax = require("gsap");


function moveAnimation(utils) {
	console.log(utils);
	//return TweenMax.to(utils.target, 1, {x: '+=123'})
}


class FrontPageStream extends Component {

	static contextTypes = { app: React.PropTypes.object }


	constructor(props) {
		super(props);
		this.state = { 
			selectedPage: -1, 
			lastIDX: 0, 
			lastFucktor: null, 
			animating: false,
			x: 0,
			y: 0
		};
	}


	scrolled(idx) {
		var sp = this.state.selectedPage;
		if ( sp == idx ) return;
		this.setState({ selectedPage: idx, lastIDX: sp });
	}
	
	
	scrollStopper() {
	
		//if(this.state.animating === true) return;
	
		var self = this;
		
		var d = this.DOMNode;
		var newPos = Math.round(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
	
		if(this.state.selectedPage != Math.round(d.scrollLeft / d.offsetWidth) ) {
			this.scrolled(Math.round(d.scrollLeft / d.offsetWidth));
		}
		
		//TweenMax.to(d, 0.2, { scrollLeft: newPos, onComplete:self.resetOldScrollAndAnimation() });

		this.setState({animating: true});
		
	}
	
	resetOldScrollAndAnimation() {
		this.setState({animating: false})
		var d = this.DOMNode;
		var self = this;
		if(d.children[0].children[this.state.lastIDX]) d.children[0].children[self.state.lastIDX].scrollTop = 0;
	}



	handleClick() {
		console.log("handleClick", this.DOMNode.offsetWidth);
	}
	
	handleScroll(e) {
		//console.log("handleTouchMove", this.DOMNode);	
		e.stopPropagation();	
		e.preventDefault();			
	}


	handleMouseDown() {
		//console.log("handleMouseDown", this);
		//var controller = this.addAnimation(moveAnimation);
		//var controller = this.addAnimation(moveAnimation);
		//controller.
	}

	handleMove() {
		//console.log("handleMove");		
	}
	
	handleTouchStart(e) {
		//console.log("handleTouchStart", e.touches[0].clientX);	
		this.dragStartX = e.touches[0].clientX;
		e.stopPropagation();
	}
	
	handleTouchMove(e) {
		//console.log("handleTouchMove", e.touches[0].clientX);	
		this.DOMNode.style = {left:e.touches[0].clientX};
		this.left = e.touches[0].clientX;		
	}

	handleTouchEnd(e) {
		//e.preventDefault();
		//e.stopPropagation();	
		
		var self = this;

		var d = this.DOMNode;
		//console.log("handleTouchEnd",this.left, d.offsetWidth / d.children[0].children.length);	

		



		//var newPos = Math.round(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
		
		var newPos = Math.round(d.style.left / d.offsetWidth)*d.offsetWidth;

		
		//console.log("handleTouchEnd newPos", newPos, Math.round(d.style.left / d.offsetWidth));
		
		
		if(this.state.selectedPage != Math.round(d.scrollLeft / d.offsetWidth) ) {
			this.scrolled(Math.round(d.scrollLeft / d.offsetWidth));
		}
		
		//var newPos = this.left;
		
		TweenMax.to(d, 0.2, { left: newPos, onComplete:self.resetOldScrollAndAnimation() });
		
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
				
				<div className="FrontPageStreamItems" style={ {width: listItems.length * document.documentElement.offsetWidth + "px"} } >
					{ listItems }
				</div>
			</div>
		);
	}

}

export default FrontPageStream;
//export default GSAP()(FrontPageStream);
