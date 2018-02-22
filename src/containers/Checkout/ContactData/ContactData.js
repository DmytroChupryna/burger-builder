import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.css';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        valitation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your city'
        },
        value: '',
        valitation: {
          required: true,
          minLength: 3,
          maxLength: 150
        },
        valid: false,
        touched: false        
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        valitation: {
          required: true
        },
        valid: false,
        touched: false        
      },
      apartments: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your apartments number'
        },
        value: '',
        valitation: {
          required: true
        },
        valid: false,
        touched: false        
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        valitation: {
          required: true
        },
        valid: false,
        touched: false        
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'faster', displayValue: 'Faster' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'faster',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (const formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
      });

  }

  checkValidity(value, rules) { 
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
     }
    
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.valitation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  render() {
    const formElementsArr = [];

    for (const key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let inputsArray = formElementsArr.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          shouldValidate={formElement.config.valitation} 
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)} />
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputsArray}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}> ORDER </Button>
      </form>
    );
    if (this.state.loading) {
      form = < Spinner />
    }


    return (
      <div className={classes.ContactData} >
        <h4> Enter your Contact data: </h4>
        {form}
      </div>
    )
  }
}
const mapStateToProps = state => { 
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}


export default connect(mapStateToProps)(ContactData);
