import cn from 'classnames';
import React, { PureComponent } from 'react';
import 'react-virtualized/styles.css'
import {WindowScroller, List, AutoSizer} from 'react-virtualized'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import styles from './LogTable.css';

// In this example, average cell height is assumed to be about 50px.
// This value will be used for the initial `Grid` layout.
// Width is not dynamic.
const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true
});

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

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    cache.clearAll();
  };

  render() {
    cache.clearAll();

    var rowCount = 0;
    if(this.props.logEntriesList){
      rowCount = this.props.logEntriesList.length;
    }

    return (
      <div >
      <WindowScroller
        ref={this._setRef}
        scrollElement={window}
        >
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
                    deferredMeasurementCache={cache}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    overscanRowCount={2}
                    rowCount={rowCount}
                    rowHeight={cache.rowHeight}
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
      </div>
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

  _rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
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
      }
    }catch(error){}

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <div key={key} className={className} style={style}>
            <div className="LineNumberRow">
              {index+1}
            </div>
            <div className="LogContentRow" style={{color: this.encodeColorString(color),}}>
              {row.content}
            </div>
          </div>
        )}
      </CellMeasurer>
    );
  };

  _setRef = windowScroller => {
    this._windowScroller = windowScroller;
  };
}

export default LogTable;
