import React from 'react';

export default function(props) {

	var m = props.data;

	return (
		<div className="DummyMessageLayout">
			<div className="Headline">{m.headline}</div>
			<div className="Text">{m.text}</div>
		</div>
    );
    
}

