import React, { Component } from 'react';
import update from 'immutability-helper';
import { SketchPicker } from 'react-color';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

class LogfileEntry extends Component {
    
    constructor(props){
        super(props);
    }

    onPathChange = (event) => {
        const newValue = event.target.value;

        var newLogEntry = update(this.props.logEntry, {
            "path": {$set: newValue}
        });
        this.props.onChanged(newLogEntry);
    }

    onSelectChange = (event) => {
        const newValue = event.target.checked;

        var newLogEntry = update(this.props.logEntry, {
            "isEnabled": {$set: newValue}
        });
        this.props.onChanged(newLogEntry);
    }

    onColorChange = (newColor) => {
        var newRgb = {r: parseInt(newColor.color.substring(1, 3), 16), 
            g: parseInt(newColor.color.substring(3, 5), 16), b: parseInt(newColor.color.substring(5, 7), 16)};
        
        var newLogEntry = update(this.props.logEntry, {
            color: {$set: newRgb}
        });
        this.props.onChanged(newLogEntry);
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

    render(){
        return (
            <div style={{padding: '5px', display:'flex', alignItems:'center'}} id={`div${this.props.logEntry.serialNumber}`}>
                <input type='checkbox' onChange={(event) => this.onSelectChange(event)} checked={this.props.logEntry.isEnabled} style={{margin: '5px'}}/> 
                <ColorPicker animation="slide-up"
                    color={this.encodeColorString(this.props.logEntry.color)} 
                    onChange={this.onColorChange} />
                <span style={{width: '20%', margin: '5px'}}>Log file {this.props.logEntry.serialNumber}: </span>
                <input type="text" class="input" style={{width:'370px'}} onChange={(event) => this.onPathChange(event)} value={this.props.logEntry.path}/>
            </div>
        )
    }
}

export default LogfileEntry;