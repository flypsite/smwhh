import React from 'react';

export default function ArticleParagraphLayout(props) {

	var m = props.data;

	return (
		<div className={m.layout}>
			{ m.headline && <h3>{m.headline}</h3> }
			{ m.text && <p>{m.text}</p> }
		</div>
    );
    
}

