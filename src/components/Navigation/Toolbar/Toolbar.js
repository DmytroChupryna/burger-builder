import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

import classes from './Toolbar.css'

class Toolbar extends Component {
  render() {
    return (
      <header className={classes.Toolbar}>
        <DrawerToggle clicked={this.props.drawerToggleClicked}/>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.DesctopOnly}>
          <NavigationItems />
        </nav>
      </header>
    );
  }
}

export default Toolbar;
