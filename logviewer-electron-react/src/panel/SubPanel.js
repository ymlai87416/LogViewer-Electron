import React, { Component } from 'react';

class SubPanel extends Component {


  render() {
    return (
      <div className="SubPanel">
        <h3>{Header}</h3>
        {props.children}
      </div>
    );
  }
}

export default SubPanel;
