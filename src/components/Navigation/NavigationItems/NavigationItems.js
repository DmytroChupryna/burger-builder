import React, { Component } from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css' 

export default class NavigationItems extends Component {
  render() {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
      </ul>
    )
  }
}
