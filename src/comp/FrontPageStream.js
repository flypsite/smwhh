import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

class FrontPageStream extends Component {

  static contextTypes = { app: React.PropTypes.object }

  constructor(props) {
    super(props);
    this.selectedPage = 0;
    this.state = { selectedPage: 0 };
  }

  clicked(msg, artstr) {
    this.selectedPage = msg.id;
    this.setState({ selectedPage: msg.id });
  }

  registerArticle(e) {
    console.log('register ' , e);
  }

  render() {

    var self = this;
    var stream = this.props.data;

    if ( ! stream ) {
      return <div>loading...</div>
    }




    const listItems = stream.items.map( function(item) {

    	return (
        <div key={item.id} onClick={ () => self.clicked(item) }>
  	      <Message key={item.id} mode="frontpages" data={ item } />
          <ArticleStream data={ item.substream } mustLoad={ item.id == self.selectedPage }/>
  	    </div> 
      )

    });


    return (
      <div className="FrontPageStream">
        { listItems }
      </div>
    );
  }

}

export default FrontPageStream;
