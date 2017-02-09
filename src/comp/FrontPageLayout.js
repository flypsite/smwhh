import React from 'react';
import FlypImage from './FlypImage.js';

// not used?
//import ArticleStream from './ArticleStream.js';

export default function FrontPageLayout(props) {

	// the message
	var m = props.data;
	

	return (
		<div className="FrontPageLayout">
			{ m.media && m.media.image && <FlypImage data={m.media} /> }
			{ m.headline && <h2>{m.headline}</h2> }
			{ m.text && <p>{m.text}</p> }
		</div>
    );
    
}

