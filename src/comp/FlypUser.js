import React from 'react';

export default function FlypUser(props) {

	var u = props.data.user;
	var m = props.data;

	return (
		<div className="FlypUser">
			<span className="UserImage"><a href={u.link}><img alt={u.name} src={u.icon} /></a></span>
			<span className="UserName"> <a href={u.link}>{ u.name } </a></span> | 
			<span className="UserHandle"> <a href={u.link}>{ u.handle }</a></span>
			<span className="Created"> <a href={u.link}>{m.created}??.??.????</a></span>
			<span className="Service"> via <a href={u.link}>{u.service}</a></span>
		</div>
		);
}

