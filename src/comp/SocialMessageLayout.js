import React from 'react';
import FlypImage from './FlypImage.js';
import FlypUser  from './FlypUser.js';

export default function SocialMessageLayout(props) {

	var m = props.data;

	return (
		<div className="SocialMessageLayout">
			{ m.media && m.media.image && <FlypImage data={m.media} /> }
			{ m.headline && <h3>{m.headline}</h3> }
			{ m.text && <p>{m.text}</p> }
			<FlypUser data={m} />
		</div>
    );
    
}

