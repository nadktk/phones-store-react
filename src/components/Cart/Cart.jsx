import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import { ProductConsumer } from '../context';
import CartList from './CartList';
import CartTotals from './CartTotals';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <div className="py-5">
          <div className="container">
          <ProductConsumer>
            {value => {
              if (!value.cart[0]) return <EmptyCart />
              return (
                <div>
                  <Title title="Your cart"/>
                  <CartColumns />
                  <CartList value={value}/>
                  <CartTotals value={value}/>
                </div>
              )
            }}
            </ProductConsumer>
          </div>
        </div>
      </section>
    )
  }
}
