import React, { Component } from 'react';
import ImageMagic from '../util/ImageMagic.js';


class FlypImage extends Component {

/*	
	componentDidMount() {
		console.log("did mount", this.xxx);
	}
*/
	calcSize(image,e) {

		console.log("calcSize", e);

		var imgValues = {
			'container_width': e.parentElement.offsetWidth,
			'container_height': e.parentElement.offsetHeight,
			'center_x': image.center?image.center.x:image.width/2,
			'center_y': image.center?image.center.y:image.height/2,
			'detail_x' : image.detail?image.detail.x:0,
			'detail_y' : image.detail?image.detail.y:0,
			'detail_width' : image.detail?image.detail.width:image.width,
			'detail_height' : image.detail?image.detail.height:image.height, 
			'zoom_mode' : image.zoom,
			'image_width': image.width,
			'image_height': image.height
		};

		var cssCalc = ImageMagic(imgValues);
		cssCalc['background-image'] = 'url('+image.url+')';

		console.log("cssCalc", cssCalc);

		for ( var k in cssCalc ) {
			console.log("key " + k + " = " + cssCalc[k]);
			e.style[k] = cssCalc[k];
		}


//		e.setAttribute('style', cssCalc);
//		e.style = cssCalc;

	}

	render() {  

		var self = this;

		// the message
		var media = this.props.data;
		if ( ! media ) return <img/>;
		var image = media.image;
		if ( ! image ) return <img/>;
		
		return (
			<div className="Image">
				<div ref={ (e) => self.calcSize(image, e) }   />
			</div>
	  );
	}    
}

export default FlypImage;