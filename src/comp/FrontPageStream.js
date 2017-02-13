import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';
import TweenMax, {Power1, Power2, Sine} from 'gsap';


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
	
	selectPage() {
		var d = this.DOMNode;
		var self = this;
		var idx = Math.round(d.scrollLeft / d.offsetWidth);
		var sp = this.state.selectedPage;

		if ( sp === idx ) return;
		// select new
		this.setState({ selectedPage: idx, lastIDX: sp });
		// reset old
		if(d.children[0].children[self.state.lastIDX]) d.children[0].children[self.state.lastIDX].scrollTop = 0;
	}


	handleScroll(e) {
	}

// MOUSE
	
	handleMouseDown(e) {
		this.startdrag(e.clientX, e.clientY, this.DOMNode);
	}
	handleMouseMove(e) {
		this.drag(e.clientX, e.clientY, this.DOMNode);
	}
	handleMouseUp(e) {
		this.stopdrag(e.clientX, e.clientY, this.DOMNode);
	}
	
// TOUCH

	handleTouchStart(e) {
		this.startdrag(e.touches[0].clientX, e.touches[0].clientY, this.DOMNode);
	}
	handleTouchMove(e) {
		// prevent touch events default behavior while being in the top part of the page
		// this effectively prevents the native scroll behavior
		var sct = this.DOMNode.children[0].children[this.state.selectedPage].scrollTop;
		if (sct < this.DOMNode.offsetHeight) e.preventDefault();

		this.drag(e.touches[0].clientX, e.touches[0].clientY, this.DOMNode);
	}
	handleTouchEnd(e) {
		this.stopdrag(null, null, this.DOMNode);
	}

// BOTH	
	startdrag(cx, cy, d) {
		
		this.dragstartX  = cx;
		this.dragstartY  = cy;
		this.scrollLeft = d.scrollLeft;
		this.scrollTop = d.children[0].children[this.state.selectedPage].scrollTop;
		this.dragdiffX = 0;
		this.dragdiffY = 0;
		this.dragstarttime = 0;
		if (this.tween) {
			this.tween.kill();
		}

	}
	
	stopdrag(cx, cy, d) {
		var self = this;
		this.dragstartX = false;
		var minmove, newPos, impetus = false, timediff = new Date() - this.dragstarttime;

		// a vertical movement
		if ( Math.abs(this.dragdiffX) < Math.abs(this.dragdiffY) ) {
			if (this.dragdiffY < 0 && this.scrollTop === 0) {
				impetus = 0.25;
				newPos = d.offsetHeight;
			} else if (this.dragdiffY > 0 && this.scrollTop <= d.offsetHeight + 50) {
				impetus = 0.25;
				newPos = 0;
			} else if (timediff < 500) {
				// not needed since we scroll natively
				//impetus = self.dragdiffY * 9/1000;
				//newPos  = self.scrollTop - impetus * d.offsetHeight;
			} // else slow movement, leave it where it is.
			if (impetus) this.tween = TweenMax.to(d.children[0].children[self.state.selectedPage], Math.sqrt(Math.abs(impetus)), { scrollTop: newPos, ease:Power1.easeOut });

		} else {
		// or a horizontal movement
			
			if (timediff < 200 && Math.abs(this.dragdiffY) < 20) minmove = true; // this is a short flip and will always result in the desired move
			else minmove = (Math.abs(this.dragdiffX) > (d.offsetWidth / 3));

			if (this.dragdiffX > 0 && minmove) newPos= Math.floor(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
			else if (minmove) newPos = Math.ceil(d.scrollLeft / d.offsetWidth)*d.offsetWidth;
			else newPos = this.scrollLeft;
			TweenMax.to(d, 0.2, { scrollLeft: newPos, onComplete:self.selectPage.bind(self) });
		}
	}

	drag(cx, cy, d) {
		var self = this;
		if (this.dragstartX) {
			if (!this.dragstarttime) this.dragstarttime = new Date();
			this.dragdiffX = cx - this.dragstartX;
			this.dragdiffY = cy - this.dragstartY;
			
			if ( Math.abs(this.dragdiffX) < Math.abs(this.dragdiffY) ) {
				TweenMax.to(d, 0.2, { scrollLeft: self.scrollLeft });
				d.children[0].children[self.state.selectedPage].scrollTop =  this.scrollTop - this.dragdiffY;
			} else {
				d.scrollLeft = this.scrollLeft - this.dragdiffX;
			}
		}
	}
	
	handleDragStart(e) {
		console.log("dragstart", e.target);
	}
	handleDrag(e) {
		console.log("drag", e.target);
	}
	handleDragEnd(e) {
		console.log("dragend", e.target);
	}


	render() {

		var self = this;
		var stream = this.props.data;

		if ( ! stream ) {
			return <div>loading...</div>
		}



		const listItems = stream.items.map( function(item, index) {

			console.log("render page " + index + " showArticle=" + (index === self.state.selectedPage) + " sub=", item.message.substream );

			return (
				<div id={item.id} key={item.id} className={item.message.style}>
					<Message key={item.id} mode="frontpages" data={ item } />
					<ArticleStream data={ item.message.substream } showArticle={ index === self.state.selectedPage } />
				</div> 
			)

		});

		// onScroll={ this.handleScroll.bind(this) }

		return (
				<div className="FrontPageStream" draggable="false"
					onTouchStart={this.handleTouchStart.bind(this)} 
					onTouchMove={this.handleTouchMove.bind(this)} 
					onTouchEnd={this.handleTouchEnd.bind(this)} 
					onMouseMove={this.handleMouseMove.bind(this)} 
					onMouseDown={this.handleMouseDown.bind(this)} 
					onMouseUp={this.handleMouseUp.bind(this)} 
					/*onScroll={this.handleScroll.bind(this)} 
					onWheel={this.handleWheel.bind(this)} 
					onDragStart={this.handleDragStart.bind(this)}
					onDrag={this.handleDrag.bind(this)}
					onDragEnd={this.handleDragEnd.bind(this)}*/
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
