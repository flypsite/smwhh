import React from 'react';
import FlypImage from './FlypImage.js';

export default function ArticleQuoteLayout(props) {

	var m = props.data;

	return (
		<div className="ArticleQuoteLayout">
			{ m.info && <h3>{m.info}</h3> }
			{ m.text && <p>{m.text}</p> }
			{ m.media && m.media.image && <FlypImage data={m.media} /> }
		</div>
    );
    
}

