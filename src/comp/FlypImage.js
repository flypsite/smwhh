import React from 'react';

export default function FlypImage(props) {

	// the message
	var media = props.data;
	if ( ! media ) return <img/>;
	var image = media.image;
	if ( ! image ) return <img/>;

	return (
<<<<<<< HEAD
			<img src={ image.url } />
=======
		<img src={ image.url } />
>>>>>>> 6ce3df57ac35a9158dfc633cd6ed13669a7d7db0
    );
    
}
