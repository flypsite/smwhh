import React from 'react';
import ArticleStream from './ArticleStream.js';
import FlypImage from './FlypImage.js';

export default function FrontPageLayout(props) {

	// the message
	var m = props.data;
	var w = 320;
	var h = 800;
	
	function handleResize(e) {
		console.log("handleResize", e);
	}
	return (
		<div onResize={ handleResize }>
			<FlypImage data={m.media} width={ w } height={ h }  />
			<div className="Headline">{m.headline}</div>
			<div className="Text">{m.text}</div>
		</div>
    );
    
}

