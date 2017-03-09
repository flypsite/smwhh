import React from 'react';

export default function SharingIcons(props) {
	var url = encodeURIComponent(document.location.href);
	var hash = encodeURIComponent(props.data.replace(/#/g, ""));
	var fburl = "https://www.facebook.com/sharer/sharer.php?u=" + url;
	var twurl = "https://twitter.com/intent/tweet?hashtags=" + hash + "&url=" + url;
	return (
		<div className="SharingIcons">
			<span className="hashtag">{props.data}</span>
			<a className="facebook"  href={fburl}> </a>
			<a className="twitter"   href={twurl}> </a>
			<a className="instagram" href="https://www.instagram.com"> </a>
		</div>
	);
}

