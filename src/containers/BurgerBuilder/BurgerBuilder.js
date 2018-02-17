import React, { Component } from 'react';
import Axios from '../../axios-orders';

import Aux from "../../hoc/Aux/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    Axios.get('https://react-my-burger-keks.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        this.setState({ error: err });
      })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addInredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type] = updateCount;

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENTS_PRICE[type];

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updateIngredients);
  }

  removeInredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type] = updateCount;

    const priceDeduction = INGREDIENTS_PRICE[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updateIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingridients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Dmytro',
        address: {
          city: 'Kyiv',
          street: 'Vasylya Stusa',
          apartments: '23'
        },
        email: 'react-burger-gmail@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    Axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
      });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;
    let burder = this.state.error ? <p>Can`t loaded!</p> : <Spinner />;

    if (this.state.ingredients) {
      burder = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingridientAdded={this.addInredientHandler}
            ingridientRemoved={this.removeInredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler} />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burder}
      </Aux>
    );
  };
}

export default withErrorHandler(BurgerBuilder, Axios);