import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';

class OrderSummary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
       })  ;

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delecious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p>Continue to checkout ?</p>
      </Aux>
    );
  }
}

export default OrderSummary;
