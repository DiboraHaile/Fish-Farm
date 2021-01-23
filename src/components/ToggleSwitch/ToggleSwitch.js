import React, { Component } from "react";
import socket from '../SocketContext'
import Switch from "react-switch";

class ToggleSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    socket.emit('switchtoggled', this.state.checked,this.props.msg)
  }

  render() {
    return (
      <label>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
        <span><text id="actuator"> {this.props.msg}</text></span>
      </label>
    );
  }
}
export default ToggleSwitch;