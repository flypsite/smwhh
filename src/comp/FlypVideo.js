import React, { Component } from 'react';
import VideoMagic from '../util/VideoMagic.js';
import FlypImage from './FlypImage.js';
import noImageIcon from'../assets/img/IconNOIMAGE.png';

export default class FlypVideo extends Component {
	constructor(props) {
	  	super(props);
	  	this.state = {
			isPlaying: false,
			vObj: null,
			style: null
	  	};
	  	
	  	this.play = this.play.bind(this);
	  	this.DOMNode = null;
	} 
	 		 	
	static contextTypes = { app: React.PropTypes.object }	
	 	
	play(){
		//console.log("play", this.props.media);
		if(this.context.app.state.mediaPlaying) {
			this.context.app.state.mediaPlaying.setState({isPlaying: false})
		}
		this.setState({ isPlaying: true });	  
		this.context.app.setState({mediaPlaying: this});	
	}
	
	
	calcHeight(e, m) {
		if(!e) return;
		this.DOMNode = e;
		let vObj = VideoMagic(e, m);
		let style = {width: vObj.style.width+"px", height: Math.ceil(vObj.style.height)+"px"};
		this.setState({ style: style, vObj: vObj });
	}
	

	render() {
	
		var m = this.props.media;

		if (!(m && m.type === "video")) {
    		return null;
  		}
		

		if(m.av && m.av.playerurl) {
		
			if(!this.state.isPlaying) {
				
				if(this.state.style === null) {
					return( <div className="FlypVideo" onClick={this.play} ref={ (e) => this.calcHeight(e, m) } ></div> )
				} else {
					return(
						<div className="FlypVideo" onClick={this.play} style={this.state.style} >
							<FlypImage data={m} alt="Click to play Video"/>
							<div className="PlayButton"/>
						</div>
					)
				}


			} else {				
				// <iframe src={vObj.src} style={{width:vObj.calcHeight,height:vObj.calcHeight}} frameBorder="0" scrolling="no" webkitAllowFullscreen="webkitAllowFullScreen" mozAllowFullscreen="mozallowfullscreen" allowFullScreen="allowFullScreen" />

				return(
					<div className="FlypVideo">
						<iframe style={this.vObj.style} src={this.vObj.src} scrolling="no"/>
					</div>
				)
				
			}		
			
		}

	}
}


