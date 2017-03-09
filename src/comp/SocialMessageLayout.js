import React from 'react';
import FlypImage from './FlypImage.js';
import FlypUser  from './FlypUser.js';
import TextMagic from '../util/TextMagic.js';

export default function SocialMessageLayout(props) {

	var m 	= props.data;
	var t 	= m.text.replace(/\| */g, "\n");
	var tm 	= TextMagic(m.text);

	return (
		<div className="SocialMessageLayout">
			{ m.media && m.media.image && <FlypImage data={m.media} /> }
			{ m.headline && <h3>{m.headline}</h3> }
			{ m.text && <p dangerouslySetInnerHTML={tm}/> }
			<FlypUser data={m} />
		</div>
    );
    
}

