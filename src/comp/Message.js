
import React, { Component } from 'react';
import LayoutMap from '../LayoutMap.js';

class Message extends Component {


  getLayoutFunc(modename, loname) {

  	var mobj = LayoutMap[modename];
  	if ( ! mobj ) mobj = LayoutMap['generic'];

		var layoutFunc = null;
		if ( loname ) layoutFunc = mobj.layouts[loname];
    if ( layoutFunc == null ) layoutFunc = mobj.fallback;
    if ( layoutFunc == null ) return null;
    return layoutFunc;

  }


  render() {

  	// put our message in a local variable
  	var message = this.props.data;

  	// find the layout function based on mode and layout properties
  	var layoutFunc = this.getLayoutFunc(this.props.mode, message.layout);

  	// do something sane if no layoutFunction is available
  	if ( ! layoutFunc ) {
  		return ( <div>no layout: {message.layout}</div> );
  	}

  	// use the layout function, luke.
    return (
        <div key={ message.id } className="Message">
            { layoutFunc(this.props) }
        </div>
    );

 }

}

export default Message;
