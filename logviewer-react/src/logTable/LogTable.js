import cn from 'classnames';
import React, { PureComponent } from 'react';
import 'react-virtualized/styles.css'
import {WindowScroller, List, AutoSizer} from 'react-virtualized'
import styles from './LogTable.css';

class LogTable extends PureComponent {

  constructor(props){
    super(props);
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
    var rowCount = 0;
    if(this.props.logEntriesList){
      rowCount = this.props.logEntriesList.length;
    }

    return (
      <WindowScroller
        ref={this._setRef}
        scrollElement={window}>
        {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
          <div className={styles.WindowScrollerWrapper}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div ref={registerChild}>
                  <List
                    ref={el => {
                      window.listEl = el;
                    }}
                    autoHeight
                    className={styles.List}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={2}
                    rowCount={rowCount}
                    rowHeight={19}
                    rowRenderer={this._rowRenderer}
                    scrollTop={scrollTop}
                    width={width}
                  />
                </div>
              )}
            </AutoSizer>
          </div>
        )}
      </WindowScroller>
    );
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

  _rowRenderer = ({index, isScrolling, isVisible, key, style}) => {
    const colorMap = this.props.colorMap;
    const row = this.props.logEntriesList[index];
    const color = colorMap[row.id];

    const className = cn(styles.row, {
      [styles.rowScrolling]: isScrolling,
      isVisible: isVisible
    });

    try{
      style = {
        ...style,
        textAlign: 'left',
        margin: '0px',
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '14px',
        color: this.encodeColorString(color)
      }
    }catch(error){}

    return (
      <div key={key} className={className} style={style}>
        {row.content}
      </div>
    );
  };

  _setRef = windowScroller => {
    this._windowScroller = windowScroller;
  };
}

export default LogTable;
