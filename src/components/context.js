import React, { Component, createContext } from 'react';
import { storeProducts, detailProduct } from '../data';

const ProductContext = createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }
    componentDidMount() {
        this.setProducts();
    }
    setProducts() {
        let temp = [];
        storeProducts.forEach(item => {
            temp.push({...item})
        });
        this.setState({
            products: temp,
        })
    }
    getItem = id => {
      return this.state.products.find( item => item.id === id);
    }
    handleDetails = id => {
      const product = this.getItem(id);
      this.setState({
        detailProduct: product
      })
    }
    addToCart = id => {
        let tempArr = [...this.state.products];
        const index = tempArr.indexOf(this.getItem(id));
        const product = tempArr[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState({
          products: tempArr,
          cart: [...this.state.cart, product]
        }, ()=> {
          this.addTotals();
        });
    }
    openModal = id => {
      const product = this.getItem(id);
      this.setState({
        modalProduct: product,
        modalOpen: true,
      })
    }
    closeModal = () => {
      this.setState({
        modalOpen: false,
      })
    }
    increment = id => {
      let tempCart = [...this.state.cart];
      const selectedProduct = tempCart.find(item => item.id === id);
      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];
      product.count++;
      product.total = product.count * product.price;
      this.setState({
        cart: [...tempCart],
      },
      () => {
        this.addTotals();
      })
    }
    decrement = id => {
      let tempCart = [...this.state.cart];
      const selectedProduct = tempCart.find(item => item.id === id);
      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];
      if (product.count === 1) {
        this.removeItem(id);
        return;
      }
      product.count--;
      product.total = product.count * product.price;
      this.setState({
        cart: [...tempCart],
      },
      () => {
        this.addTotals();
      })
    }
    removeItem = id => {
      let tempProducts = [...this.state.products];
      let tempCart = [...this.state.cart].filter(item => item.id !== id);
      const index = tempProducts.indexOf(this.getItem(id));
      let removedProduct = tempProducts[index];
      removedProduct.inCart = false;
      removedProduct.count = 0;
      removedProduct.total = 0;
      this.setState({
        cart: [...tempCart],
        products: [...tempProducts],
      },
      () => {
        this.addTotals();
      });
    }
    clearCart = () => {
      this.setState({
        cart: [],
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
      }, () => {
        this.setProducts();
      })
    }
    addTotals = () => {
      let subTotal = 0;
      this.state.cart.forEach(item => {subTotal += item.total});
      const tax = parseFloat((subTotal * .1).toFixed(2));
      const total = subTotal + tax;
      this.setState({
        cartSubtotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      })


    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetails: this.handleDetails,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
