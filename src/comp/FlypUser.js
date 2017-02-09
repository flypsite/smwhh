import React from 'react';

export default function FlypUser(props) {

	var u = props.data;

	return (
		<div className="FlypUser">
			{ u.name }{ u.handle } {u.service} {u.link}
			<img src={u.icon} />
		</div>
    );
    
}

