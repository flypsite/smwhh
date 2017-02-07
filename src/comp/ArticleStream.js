import React, { Component } from 'react';
import Message from './Message.js'

class ArticleStream extends Component {

  static contextTypes = { app: React.PropTypes.object }


  setStream(s) {
      this.setState(s);
  }


  load(substream) {

    if ( this.loading ) return;
    this.loading = true;

    var self = this;
    console.log('load ');
    this.context.app.loadStreamFull(substream.key, function(stream) { 
      self.setStream(stream);
    });
  }


  render() {

    if ( this.props.mustLoad ) {
      this.load(this.props.data);
    }


    var subinfo = this.props.data;
    if ( ! subinfo ) {
      return <div>no substream...</div>
    }


    var stream = this.state;

    if ( ! stream ) {
      return <div>loading...</div>
    }


    const listItems = stream.items.map( (item) =>
      <div key={item.id}>
        <Message mode="article" data={ item }/>
      </div>
    );


    return (
      <div className="ArticleStream">
          { listItems }
      </div>
    );
  }

}

export default ArticleStream;
