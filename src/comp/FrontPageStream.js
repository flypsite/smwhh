import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

class FrontPageStream extends Component {


  render() {

    var stream = this.props.data;

    if ( ! stream ) {
      return <div>loading...</div>
    }


		var dummy;
//		window.addEventListener('scroll', function(e) {
// 			last_known_scroll_position = window.scrollY;
// 			if (!ticking) {
// 				window.requestAnimationFrame(function() {
// 					doSomething(last_known_scroll_position);
// 					ticking = false;
// 				});
// 			}
// 			ticking = true;
			dummy = {
			items: [
				{ id: "a" }, {id: "b" }, {id: "c" }, {id: "d" }, {id: "e" }, {id: "f" }
			]
		};
//		});


    const listItems = stream.items.map( (item) =>
    	<div onScroll={ () => { console.log('scroll') }  }>
	      <Message key={item.id} mode="frontpages" data={ item }/>
	      <ArticleStream data={dummy} />
	    </div>
    );


    return (
      <div className="FrontPageStream">
        { listItems }
      </div>
    );
  }

}

export default FrontPageStream;
