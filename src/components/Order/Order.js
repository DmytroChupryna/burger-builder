import React, { Component } from 'react';
import classes from './Order.css';

export default class Order extends Component {
  render() {
    const ingredients = [];
    
    for (const ingName in this.props.ingredients) {
    
      if (this.props.ingredients.hasOwnProperty(ingName)) {
        ingredients.push({
          name: ingName,
          amount: this.props.ingredients[ingName]
        });
      }
    
    }
    

    const ingredientOutput = ingredients.map(ig => { 
      return (
        <span
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
          }}  
          key={ig.name}> {ig.name} ({ig.amount})</span>
      );
    });


    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {Number.parseFloat(this.props.price).toFixed(2)}</strong></p>
      </div>
    )
  }
}
