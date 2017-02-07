import React from 'react';
import FlypImage from './FlypImage.js';

export default function ArticleImageLayout(props) {

	var m = props.data;

	return (
		<div className={m.layout}>
			{ (m.headline) && <h3>{m.headline}</h3> }
			<FlypImage data={m.media} />
			{ (m.text) && <p>{m.text}</p> }
		</div>
    );
    
}

