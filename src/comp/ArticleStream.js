import React, { Component } from 'react';
import Message from './Message.js'

class ArticleStream extends Component {


  render() {

    var stream = this.props.data;

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
