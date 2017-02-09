import React from 'react';

export default function FlypUser(props) {

	var u = props.data.user;
	var m = props.data;

	return (
		<div className="FlypUser">
			{ u.name }{ u.handle } {u.service} {u.link} {m.created}
			<img src={u.icon} />
		</div>
    );
    
}

