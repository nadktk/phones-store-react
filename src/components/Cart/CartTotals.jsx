import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ButtonContainer from '../Button';

export default function CartTotals({ value }) {
  const { cartSubtotal, cartTax, cartTotal, clearCart } = value;
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <ButtonContainer
                className="button-blue mb-3 px-5"
                type="button"
                onClick={()=> clearCart()}
              >
              clear cart
              </ButtonContainer>
            </Link>
            <h5>
              <strong>subtotal: ${cartSubtotal}</strong>
            </h5>
            <h5>
              <strong>tax: ${cartTax}</strong>
            </h5>
            <h5>
              <strong>total: ${cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </Fragment>
  )
}