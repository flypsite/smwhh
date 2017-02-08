import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

class FrontPageStream extends Component {

  static contextTypes = { app: React.PropTypes.object }

  constructor(props) {
    super(props);
    this.selectedPage = 0;
    this.state = { selectedPage: 0 };
    //this.baseWidth = ReactDOM.findDOMNode(this.app).offsetWidth;
    
  }

  clicked(msg, artstr) {
    this.selectedPage = msg.id;
    this.setState({ selectedPage: msg.id });
  }
  
  scrolled(msg) {
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
        <div id={item.id} key={item.id} onScroll={ () => self.scrolled (item) } className={item.style}>
  	      <Message key={item.id} mode="frontpages" data={ item } />
          <ArticleStream data={ item.substream } showArticle={ item.id == self.selectedPage }/>
  	    </div> 
      )

    });

    return (
      <div className="FrontPageStream" style={ {width: listItems.length * document.documentElement.offsetWidth + "px"} }>
        { listItems }
      </div>
    );
  }

}

export default FrontPageStream;
