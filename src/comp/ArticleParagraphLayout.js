import React from 'react';
import FlypImage from './FlypImage.js';
import TextMagic from '../util/TextMagic.js';

export default function ArticleParagraphLayout(props) {

	var m = props.data;
	var tm = TextMagic(m.text) 

	return (
		<div className="ArticleParagraphLayout">
			{ m.headline && <h3>{m.headline}</h3> }
			{ m.text && <p dangerouslySetInnerHTML={tm}/> }
			{ m.media && m.media.image && <FlypImage data={m.media} /> }
		</div>
    );
}

