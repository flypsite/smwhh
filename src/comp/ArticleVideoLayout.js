import React from 'react';
import FlypVideo from './FlypVideo.js';

export default function ArticleVideoLayout(props) {

	var m = props.data;

	return (
		<div className="ArticleVideoLayout">
			<FlypVideo media={m.media} />
		</div>
    );
    
}

