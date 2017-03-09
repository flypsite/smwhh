import React from 'react';
import FlypImage from './FlypImage.js';
import TextMagic from '../util/TextMagic.js';

export default function ArticleImageLayout(props) {

	var m 		= props.data;
	var stylez 	= {height: m.media.image.height/m.media.image.width*90 + "vw"};
	var tm 		= TextMagic(m.text);
	
	return (
		<div className="ArticleImageLayout">
			{ (m.headline) && <h3>{m.headline}</h3> }
			<FlypImage data={m.media} stylez={stylez} />
			{ (m.text) && <p dangerouslySetInnerHTML={tm}/>  }
		</div>
    );
    
}

