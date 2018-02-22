import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css' 

export default class NavigationItem extends Component {
  render() {
    return (
      <li className={classes.NavigationItem}>
        <NavLink
          to={this.props.link}
          exact={this.props.exact}
          activeClassName={classes.active}>
          {this.props.children}
        </NavLink>
      </li>
    )
  }
}
