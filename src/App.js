import React, { Component } from 'react';
import logo from './logo.svg';
import FrontPageStream from './comp/FrontPageStream.js';
import TestStream from './teststream.js'
import './App.css';
import Pusher from 'pusher';
import Vienna from './vienna.module.js';

class App extends Component {

  constructor(props) {

    super(props);


    // init everything here

    var self = this;
    window.setTimeout( function() {
      TestStream.items = TestStream.updates;
      self.setStream( TestStream );
    }, 3000);


  }

  setStream(s) {
    this.setState(s);
  }


  render() {

    console.log("app.render()")
    // var p = new Pusher({

    // });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to SMWHH 2017</h2>
        </div>
       <FrontPageStream data={this.state}/>
      </div>
    );
  }
}

export default App;
