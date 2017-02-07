import React from 'react';
import ImageMagic from '../util/ImageMagic.js'

export default function FlypImage(props) {

	// the message
	var media = props.data;
	if ( ! media ) return <img/>;
	var image = media.image;
	if ( ! image ) return <img/>;

	var whatever = { dummy: true };
	ImageMagic(whatever);

	return (
		<img src={ image.url } />
    );
    
}


