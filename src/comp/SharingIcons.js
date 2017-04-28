import React from 'react';

export default function SharingIcons(props) {
	var url = encodeURIComponent(document.location.href);
	var hash = encodeURIComponent(props.data.replace(/#/g, ""));
	var fburl = "https://www.facebook.com/sharer/sharer.php?u=" + url;
	var twurl = "https://twitter.com/intent/tweet?hashtags=" + hash + "&url=" + url;
	return (
		<div className="SharingIcons">
			<span className="hashtag">{props.data}</span>
			<a target="_top" className="facebook"  href={fburl}> </a>
			<a target="_top" className="twitter"   href={twurl}> </a>
			<a target="_top" className="instagram" href="https://www.instagram.com"> </a>
		</div>
	);
}

