import React from 'react';
import ArticleStream from './ArticleStream.js';
import FlypImage from './FlypImage.js';

export default function FrontPageLayout(props) {

	// the message
	var m = props.data;
	return (
		<div>
			<FlypImage data={m.media}/>
		</div>
    );
    
}

