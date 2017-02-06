import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

class FrontPageStream extends Component {


  render() {

    var stream = this.props.data;

    if ( ! stream ) {
      return <div>loading...</div>
    }

		var dummy = {
			items: [
				{ id: "a" }, {id: "b" }, {id: "c" }, {id: "d" }, {id: "e" }, {id: "f" }
			]
		};


    const listItems = stream.items.map( (item) =>
    	<div>
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
