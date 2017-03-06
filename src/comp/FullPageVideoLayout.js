import React from 'react';
import FlypVideo from './FlypVideo.js';

export default function FullPageVideoLayout(props) {

	var m = props.data;
	var autoplay = (m && m.media && m.media.av && props.mode === "fullpage");

	return (
		<div className="FullPageVideoLayout">
			<FlypVideo media={m.media} autoplay={autoplay} sizing="cover"/>
		</div>
    );
    
}

