import React, { Component } from 'react';
import classes from './Spinner.css';

export default class Spinner extends Component {
  render() {
    return (
      <div className={classes.Loader}>
        Loading...
      </div>
    )
  }
}
