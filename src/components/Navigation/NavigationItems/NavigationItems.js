import React, { Component } from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css' 

export default class NavigationItems extends Component {
  render() {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Authnticate</NavigationItem>
      </ul>
    )
  }
}
