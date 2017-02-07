import React from 'react';
import ArticleStream from './ArticleStream.js';
import FlypImage from './FlypImage.js';

export default function FrontPageLayout(props) {

	// the message
	var m = props.data;
	var w = 320;
	var h = 800;
	

	return (
		<div className={m.layout}>
			<FlypImage data={m.media} width={ w } height={ h }  />
			<div className="Headline">{m.headline}</div>
			<div className="Text">{m.text}</div>
		</div>
    );
    
}

