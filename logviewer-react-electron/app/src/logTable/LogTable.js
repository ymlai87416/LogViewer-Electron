import React, { Component } from 'react';
import './LogTable.css';

class LogTable extends Component {

  constructor(props){
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    
  }

  rgbToHex = (rgb) => { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
            hex = "0" + hex;
    }
    return hex;
  };

  encodeColorString = ({r, g, b}) => {
    var red = this.rgbToHex(r);
    var green = this.rgbToHex(g);
    var blue = this.rgbToHex(b);
    return "#"+red+green+blue;
}

  render() {
    const colorMap = this.props.colorMap;
    return (
      <div className="LogTable">
        <div className="LineNumber">
          {
            this.props.logEntriesList.map((element, index) => {
              return (
                <div className="column">
                  {index+1}
                </div>
              )
            })
          }
        </div>
        <div className="LogContent">
          {
            this.props.logEntriesList.map((element, index) => {
              var color = colorMap[element.id];
              return (
                <div className="column" style={{color: this.encodeColorString(color)}}>
                  <pre>{element.content}</pre>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default LogTable;
