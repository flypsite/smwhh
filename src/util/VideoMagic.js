export default function videoMagic( e, media ) {
	
	var ww = media.av.width ? media.av.width : media.image.width;   
	var hh = media.av.height ? media.av.height : media.image.height;
	// most services w/o av.width/height
	var aspectratio = ww/hh;
	if (isNaN(aspectratio) || !aspectratio)  aspectratio = 16/9;

	let zoomFactor = 1;
	
	if(aspectratio >= 1) { // querkant
		zoomFactor = e.offsetWidth / ww;
	} else {
		zoomFactor = 1; // FIXME
	}
	
	var calcWidth = ww * zoomFactor; 
	var calcHeight = hh * zoomFactor; 

	var padpercent = Math.round(10000/aspectratio)/100;

	var uu = media.av.playerurl
	uu = uu.replace(/^.*youtu.be\/(.+)$/i,                    	'https://www.youtube-nocookie.com/embed/$1?html5=1&amp;autoplay=1&amp;origin=http://flyp.tv');
	uu = uu.replace(/^.*www.youtube.com\/.*\?v=([^&#]+).*$/i, 	'https://www.youtube-nocookie.com/embed/$1?html5=1&amp;autoplay=1&amp;origin=http://flyp.tv');	
	uu = uu.replace(/^.*www.youtube.com\/embed\/(.+)$/i,        'https://www.youtube-nocookie.com/embed/$1?html5=1&amp;autoplay=1&amp;origin=http://flyp.tv');
	uu = uu.replace(/^.*livestream.*accountId=([0-9]+).*eventId=([0-9]+).*$/i, 	'https://livestream.com/accounts/$1/events/$2/player?autoPlay=true');
	uu = uu.replace(/^.*vimeo.*\/([0-9]+)$/i,                 	'https://player.vimeo.com/video/$1?autoplay=1');
	uu = uu.replace(/^.*ustream.*\?cid=([0-9]+).*$/i,         	'https://www.ustream.tv/embed/$1?v=3&amp;wmode=direct&amp;autoplay=1');
	if (uu.match(/media.tagesschau.de\/video/) != null) {
		uu = media.av.playerurl;
		uu = uu.replace(/\.html/,'~player_autoplay-true.html');
	}

	if(uu.match(/http:\/\//) != null  ) { // && ( uu.match(/\.mp4/) == null && uu.match(/\.ogg/) == null && uu.match(/\.webm/) == null )
		uu = uu.replace(/http:\/\//,'//'); // http bleibt http, https wird https!
	}
	
	var vObj = {
		src: uu,
		width: ww,
		height: hh,
		aspectratio: aspectratio,
		padpercent: padpercent,
		style: { width: calcWidth, height: calcHeight, border: 0, frameborder: 0, "scrolling": "no" }
	}

	return vObj;
}