import React from 'react';

export default function ArticleVideoLayout(props) {

	var m = props.data;

	return (
		<div className="dummymessage">
			<div className="Headline">{m.headline}</div>
			<div className="Text">{m.text}</div>
		</div>
    );
    
}
