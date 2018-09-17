import React, { Component } from 'react';

class SubPanel extends Component {


  render() {
    return (
      <div className="SubPanel">
        <h3>{this.props.header}</h3>
        {this.props.children}
      </div>
    );
  }
}

export default SubPanel;
