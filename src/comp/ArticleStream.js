import React, { Component } from 'react';
import Message from './Message.js'

class ArticleStream extends Component {




  setStream(s) {
      this.setState(s);
  }


  render() {

    var stream = this.state;

    if ( ! stream ) {
      return <div>loading...</div>
    }


    const listItems = stream.items.map( (item) =>
      <Message key={item.id} mode="article" data={ item }/>
    );


    return (
      <div className="ArticleStream">
        { listItems }
      </div>
    );
  }

}

export default ArticleStream;
