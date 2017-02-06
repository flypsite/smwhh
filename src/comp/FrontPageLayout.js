import React from 'react';

export default function FrontPageLayout(props) {

	// the message
	var m = props.data;

	return (
		<div>
			FrontPageLayout {m.id}
		</div>
    );
    
}

