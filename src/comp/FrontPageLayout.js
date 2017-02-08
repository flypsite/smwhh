import React from 'react';
import ArticleStream from './ArticleStream.js';
import FlypImage from './FlypImage.js';

export default function FrontPageLayout(props) {

	// the message
	var m = props.data;
	

	return (
		<div className="FrontPageLayout">
			<FlypImage data={m.media}  />
			<h2>{m.headline}</h2>
			<p>{m.text}</p>
		</div>
    );
    
}

