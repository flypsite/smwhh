import React, { Component } from 'react';
import Message from './Message.js'

class FrontPageStream extends Component {


  render() {

    var stream = this.props.data;

    if ( ! stream ) {
      return <div>loading...</div>
    }


    const listItems = stream.items.map( (item) =>
      <Message key={item.id} mode="frontpages" data={ item }/>
    );


    return (
      <div className="FrontPageStream">
        { listItems }
      </div>
    );
  }

}

export default FrontPageStream;
