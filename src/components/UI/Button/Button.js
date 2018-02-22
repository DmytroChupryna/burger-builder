import React, { Component } from 'react';
import classes from './Button.css';

class Button extends Component {
  render() {
    return (
      <button
        className={[classes.Button, classes[this.props.btnType]].join(' ')}
        disabled={this.props.disabled}
        onClick={this.props.clicked}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
