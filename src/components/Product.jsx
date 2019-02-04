import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ProductConsumer } from './context';

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 col-md-6 col-lg-3 mx-auto my-3">
        <div className="card">
        <ProductConsumer>
         {value => (
            <div
            className="img-container p-5"
            onClick={() => {
              value.handleDetails(id);
            }}
          >
            <Link to="/details">
              <img src={img} alt={`product ${id}`} className="card-img-top"/>
            </Link>
            <button
              className="cart-btn"
              disabled={inCart}
              onClick={()=>{
                value.addToCart(id);
                value.openModal(id);
              }}>
              {inCart?(<p className="mb-0 text-capitalize" disabled>in cart</p>):(<i className="fas fa-cart-plus"/>)}
            </button>
          </div>
         )}
        </ProductConsumer>
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-bright mb-0">${price}</h5>
          </div>
        </div>
      </ProductWrapper>
    )
  }
}

const ProductWrapper = styled.div`
  .card {
    border: 0;
    transition: all 1s ease;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all .3s linear;
  }
  &:hover {
    .card {
        box-shadow: 2px 2px 5px rgba(0,0,0,.1);
    }
    .card-footer {
        background: var(--beige);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
    .card-img-top {
        transition: all .3s linear;
    }
    &:hover .card-img-top {
        transform: scale(1.3);
    }
  }
  .cart-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: .4rem .8rem;
    background: var(--blue);
    border: none;
    color: white;
    border-radius: .5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all .3s linear;
    &:focus {
        outline: none;
    }
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    background: var(--red);
    cursor: pointer;
    transition: none;
  }
`
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired,
}