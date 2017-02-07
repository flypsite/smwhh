import React from 'react';

export default function FlypImage(props) {

	// the message
	var media = props.data;
	if ( ! media ) return <img/>;
	var image = media.image;
	if ( ! image ) return <img/>;

	return (
		<img src={ image.url } />
    );
    
}



/*

	fl.calcImageProperties = function(imgObj){

		var zoomFactor = 1;

		// Punkt, auf den hin der Bildausschnitt beschnitten wird, relativ zum ursprung von detail
		var boxCuttingCenterX = imgObj.center_x - imgObj.detail_x; //imgObj.x + (imgObj.boxX / 2);
		var boxCuttingCenterY = imgObj.center_y - imgObj.detail_y; // imgObj.y + (imgObj.boxY / 2);

		// Hoehe und Breite des Container, auf den das Bild angepasst werden soll
		var containerWidth = imgObj.container_width;
		var containerHeight = imgObj.container_height;
		var containerAr = containerWidth / containerHeight;

		// Abmessungen des Bildes
		var imgWidth = imgObj.image_width;
		var imgHeight = imgObj.image_height;
		var imgAr = imgWidth / imgHeight;

		// Abmessungen des Ausschnittes
		var selectX = imgObj.detail_x;
		var selectY = imgObj.detail_y;
		var selectWidth = imgObj.detail_width;
		var selectHeight = imgObj.detail_height;
		var selectAr = selectWidth / selectHeight;

		var zoom = imgObj.zoom_mode == 1;

		var refAr = zoom ? selectAr : imgAr;
		var refWidth  = zoom ? selectWidth  : imgWidth;
		var refHeight = zoom ? selectHeight : imgHeight;


		var sWidth  = imgWidth;
		var sHeight = imgHeight;

		var dWidth  = containerWidth;
		var dHeight = containerHeight;

		var scaleToWidth = false;
		var scaleToHeight = false;

		var cutting = false;
		var samear  = false;

		if ( containerAr == refAr ) {

			zoomFactor = containerWidth / refWidth;
			sHeight = zoom ? selectHeight : imgHeight; 
			sWidth  = zoom ? selectWidth : imgWidth;
			if ( ! zoom ) {
				scaleToWidth  = true;
				scaleToHeight = true;
			}

			samear = true;

		} else if ( containerAr > refAr ) { // wider container

			if ( zoom ) {

				sHeight = selectHeight;
				sWidth  = sHeight * containerAr;

				if ( sWidth < imgWidth ) {
					zoomFactor = containerHeight / selectHeight;
				} else {
					zoomFactor = containerWidth / imgWidth;
					sWidth  = imgWidth;
					sHeight = sWidth * 1/containerAr;
				}
			} else {
				scaleToWidth = true;
				zoomFactor = containerWidth / imgWidth;
				sWidth  = imgWidth;
				sHeight = sWidth * 1/containerAr;
			}
		} else { // higher container, scale to width

			if ( zoom ) {

				sWidth = selectWidth;
				sHeight  = sWidth / containerAr;

				if ( sHeight < imgHeight ) {
					zoomFactor = containerWidth / selectWidth;

				} else {
					zoomFactor = containerHeight / imgHeight;
					sHeight  = imgHeight;
					sWidth = sHeight * containerAr;
				}
			} else {
				scaleToHeight = true;
				zoomFactor = containerHeight / imgHeight;
				sHeight  = imgHeight;
				sWidth = sHeight * containerAr;
			}
		}

		var sx = scaleToWidth ? 0 : selectX;
		var sy = scaleToHeight ? 0 : selectY;

		// free space outside selection
		var padRatioX = (imgWidth - selectWidth) / selectX;
		var padRatioY = (imgHeight - selectHeight) / selectY;

		// cut ratio inside selection
		var cutRatioX = boxCuttingCenterX / selectWidth;
		var cutRatioY = boxCuttingCenterY / selectHeight;

		var selRectWidth  = selectWidth * zoomFactor;
		var selRectHeight = selectHeight * zoomFactor;

		var padd = 0;

		if ( scaleToWidth === false ) {
			if ( selRectWidth < containerWidth ) {
				padd = (containerWidth - selRectWidth) / padRatioX;
				sx -= padd / zoomFactor;
			} else {
				padd = (selRectWidth - containerWidth) * cutRatioX;
				sx += padd / zoomFactor;
				cutting = true;
			}
		}

		if ( scaleToHeight === false ) {
			if ( selRectHeight < containerHeight ) {
				padd = (containerHeight - selRectHeight) / padRatioY;
				sy -= padd / zoomFactor;
			} else {
				padd = (selRectHeight - containerHeight) * cutRatioY;
				sy += padd / zoomFactor;
				cutting = true;
			}
		}


		var selRectX = (selectX - sx) * zoomFactor;
		var selRectY = (selectY - sy) * zoomFactor;

		var bcx = ( imgObj.detail_x - sx )  * zoomFactor;
		var bcy = ( imgObj.detail_y - sy )  * zoomFactor;

		var margin_top = Math.round(sy * zoomFactor) * -1;

		margin_left = Math.round(sx * zoomFactor) * -1;
		width = Math.round(imgObj.image_width*zoomFactor);
		height = Math.round(imgObj.image_height*zoomFactor);

		if(margin_top+height < containerHeight){
			margin_top = containerHeight-height;
		}

		var result = {
				'margin-top' : margin_top,
				'margin-left' : margin_left,
				'width' : width,
				'height' : height,
				'display': 'block',
				'background-size' : "cover"
		};
		return result;
	}

*/