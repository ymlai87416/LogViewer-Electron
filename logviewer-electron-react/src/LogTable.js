import React, { Component } from 'react';

class LogTable extends Component {

  constructor(props){
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    
  }

  render() {
    return (
      <div className="LogTable" style="height: 97%;overflow: auto;will-change:transform;">
      </div>
    );
  }
}

export default LogTable;
