import React, { Component } from 'react';
import Message from './Message.js';
import ArticleStream from './ArticleStream.js';

class FrontPageStream extends Component {


  constructor(props) {
    super(props);
    this.selectedPage = 0;
    this.state = { selectedPage: 0 };
  }

  clicked(id) {
    console.log('click ' + id + " " + new Date());
    this.selectedPage = id;
    this.setState({ selectedPage: id })


  }


  render() {

    var self = this;
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

    
    // if ( this.selectedPage == item.id ) {
    //  artstr = <ArticleStream data={dummy} />
    // }


    const listItems = stream.items.map( function(item) {

      var artstr = <div>empty</div>;
      if ( self.selectedPage == item.id ) {
        artstr = <ArticleStream data={dummy} />
      }

    	return <div onClick={ () => self.clicked(item.id) }>
	      <Message key={item.id} mode="frontpages" data={ item } />
        { artstr }
	    </div>
    });


    return (
      <div className="FrontPageStream">
        { listItems }
      </div>
    );
  }

}

export default FrontPageStream;
