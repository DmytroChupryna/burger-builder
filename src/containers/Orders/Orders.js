import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchOrders = [];
        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            const element = res.data[key];

            fetchOrders.push({ ...element, id: key });
          }
        }
        
        this.setState({ loading: false, orders: fetchOrders })
      })
      .catch(err => {
        this.setState({ loading: false })
      })
  }
  
  render() {
    let orders = this.state.orders.map(order => { 
      return <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}/>
    })
  
    return (
      <div>
        {orders}
      </div>
    )
  }
}

export default withErrorHandler(Orders,axios);
