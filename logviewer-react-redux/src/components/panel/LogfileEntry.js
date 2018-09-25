import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import { doLogFileUpdate } from '../../actions';

class LogfileEntry extends Component {

    constructor(props) {
        super(props);
    }

    onPathChange = (event) => {
        const newValue = event.target.value;
        this.props.onLogFileUpdate(this.props.logEntry.serialNumber, "path", newValue);
    }

    onSelectChange = (event) => {
        const newValue = event.target.checked;
        this.props.onLogFileUpdate(this.props.logEntry.serialNumber, "isEnabled", newValue);
    }

    onColorChange = (newColor) => {
        this.colorPicker.state.color = newColor.color;
    }

    onColorChangeFinish = () => {
        let newColor = this.colorPicker.state.color;
        console.log(this.colorPicker)
        console.log(newColor)
        var newRgb = {
            r: parseInt(newColor.substring(1, 3), 16),
            g: parseInt(newColor.substring(3, 5), 16), b: parseInt(newColor.substring(5, 7), 16)
        };

        this.props.onLogFileUpdate(this.props.logEntry.serialNumber, "color", newRgb);
    }

    rgbToHex = (rgb) => {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    encodeColorString = ({ r, g, b }) => {
        var red = this.rgbToHex(r);
        var green = this.rgbToHex(g);
        var blue = this.rgbToHex(b);
        return "#" + red + green + blue;
    }

    render() {
        return (
            <div style={{ padding: '5px', display: 'flex', alignItems: 'center' }}>
                <input type='checkbox' onChange={(event) => this.onSelectChange(event)} checked={this.props.logEntry.isEnabled} style={{ margin: '5px' }} />
                <ColorPicker animation="slide-up"
                    ref={(input) => { this.colorPicker = input }}
                    color={this.encodeColorString(this.props.logEntry.color)}
                    onChange={this.onColorChange}
                    onClose={this.onColorChangeFinish} />
                <span style={{ width: '20%', margin: '5px' }}>Log file {this.props.logEntry.serialNumber}: </span>
                <input type="text" class="input" style={{ width: '370px' }} onChange={(event) => this.onPathChange(event)} value={this.props.logEntry.path} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onLogFileUpdate: (id, field, value) => dispatch(doLogFileUpdate(id, field, value)),
});

export default connect(
    null,
    mapDispatchToProps
)(LogfileEntry);