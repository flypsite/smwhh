import React, { Component } from 'react';

class AnyStream extends Component {

  setStream(s) {
    this.setState(s);
  }


  render() {
    return (
      <div className="AnyStream">
        My AnyStream
      </div>
    );
  }

}

export default AnyStream;
