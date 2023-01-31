import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const pubKey =
  'pk_test_51MKQNPJOzVX3Pu1h7TA3MHnHrS2g4jAn4mokjctjKtGQDg1FxLc8ThHfuFK1RNZP0Ok2gPyaSCHTWxwqVegjgm0D005oWMb8LK';
  const [product, setProduct] = useState({
    name: 'Headphone',
    price: 10,
  });

  const priceForStripe = product.price * 100;

  const payNow = async token  =>{
    try{
      const response = await axios(
        {
          url: 'http://localhost:5000/payment',
          method: 'POST',
          data:{
            amount: product.price * 100,
            token,
          },
        }
      );
      if(response.status === 200){
        console.log('Your payment was successful');
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="container">
      <h2>Complete React & Stripe payment integrations</h2>
      <p>
        <span>Product: </span>
        {
          product.name
        }
      </p>
      <p>
        <span>Price: </span> {product.price}
      </p>

      <StripeCheckout
      stripeKey ={pubKey}
      label='Pay Now'
      name ='Pay with Credit Card'
      billingAddress 
      shippingAddress 
      amount={priceForStripe}
      description={`Your total is $${product.price}`} 
      token = {payNow}

      />
    </div>

  );
}

export default App;
