import React, { Component } from 'react';
import { ProductConsumer } from './context';
import { Link } from 'react-router-dom';
import ButtonContainer from './Button';
import Title from './Title';

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { title, company, img, info, price, inCart, id } = value.detailProduct;
            return (
              <div className="container py-5">
                  <Title title={title}/>
                  <div className="row">

                    {/* product image */}
                    <div className="col-10 mx-auto col-md-6 my-3">
                      <img src={img} alt={title} className="img-fluid"/>
                    </div>

                    {/* product text */}
                    <div className="col-10 mx-auto col-md-6 my-3">
                      <h5 className="text-bright">{title}</h5>
                      <h6 className="text-muted mb-5 text-uppercase">Made by: {company}</h6>
                      <h4 className="text-blue font-weight-bold mb-5">Price: ${price}</h4>
                      <h5>Description:</h5>
                      <p className="text-muted">{info}</p>

                    {/* buttons */}
                    <div>
                      <Link to='/'>
                        <ButtonContainer className="button-blue">
                          Back to products
                        </ButtonContainer>
                      </Link>
                      <ButtonContainer
                        className="button-red ml-2"
                        disabled={inCart}
                        onClick={()=> {
                          value.addToCart(id);
                          value.openModal(id);
                        }}
                      >
                        {inCart ? "in cart" : "add to cart"}
                      </ButtonContainer>
                    </div>

                  </div>

                </div>
              </div>
            );
          }
        }
      </ProductConsumer>
    )
  }
}
