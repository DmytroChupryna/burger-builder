import React, { Component } from 'react';

import classes from './Input.css';

export default class Input extends Component {
  render() {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    
    if (this.props.invalid && this.props.shouldValidate && this.props.touched) { 
      inputClasses.push(classes.Invalid);
    }

    switch (this.props.elementType) {
      case ('input'):
        inputElement = <input
          className={inputClasses.join(' ')}
          {...this.props.elementConfig}
          value={this.props.value} 
          onChange={this.props.changed}/>;
        break;

      case ('textarea'):
        inputElement = <textarea
          className={inputClasses.join(' ')}
          {...this.props.elementConfig}
          value={this.props.value} 
          onChange={this.props.changed}/>
        break;
      
      case ('select'):
        inputElement = <select
          className={inputClasses.join(' ')}
          value={this.props.value}
          onChange={this.props.changed}>
          {this.props.elementConfig.options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}>
              {opt.displayValue}
            </option>
            ))}
        </select>
        break;
      
      default:
        inputElement = <input
          className={inputClasses.join(' ')}
          {...this.props.elementConfig}
          value={this.props.value} 
          onChange={this.props.changed}/>
        break;
    }

    return (
      <div className={classes.Input}>
        <label className={classes.Label}>{this.props.label}</label>
        {inputElement}
      </div>
    )
  }
}
