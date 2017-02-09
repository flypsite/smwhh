import React from 'react';
import FlypImage from './FlypImage.js';

export default function ArticleParagraphLayout(props) {

	var m = props.data;

	return (
		<div className="ArticleParagraphLayout">
			{ m.headline && <h3>{m.headline}</h3> }
			{ m.text && <p>{m.text}</p> }
			{ m.media && m.media.image && <FlypImage data={m.media} /> }
		</div>
    );
    
}

