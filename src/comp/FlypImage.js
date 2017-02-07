import React from 'react';

export default function FlypImage(props) {

	// the message
	var media = props.data;
	if ( ! media ) return <img/>;
	var image = media.image;
	if ( ! image ) return <img/>;

	return (
			<img src={ image.url } />
    );
    
}
