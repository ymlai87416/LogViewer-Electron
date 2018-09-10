import React, { Component } from 'react';

class LogFileEntry extends Component {
    
    constructor(props){
        super.props();
    }

    onChange = (tag, event) => {
        const field = tag
        const newValue = event.target.value;

        newLogEntry = update(this.props.logEntry, {
            [field]: {$set: newValue}
        });
        this.props.onChanged(newLogEntry);
    }

    render(){
        return (
            <div style="padding:5px;display:flex;align-items:center;" id={`div${this.props.logEntry.serialNumber}`}>
                <input type='checkbox' onchange={(event) => this.onChange("isEnabled", event)} checked={this.props.logEntry.isEnabled}/> 
                <SketchPicker color={ this.props.logEntry.color }
                    onChangeComplete={(event) => this.onChange("color", event) }></SketchPicker>
                <span>Log file {iCnt}: </span>
                <input type="text" class="input" style="width:370px" onChange={(event) => this.onChange("text", event)}/>
            </div>
        )
    }

}