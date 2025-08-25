import axios from 'axios';
import { useEffect, useState } from 'react'
import CheckoutHeader from './CheckoutHeader';
import './CheckoutPage.css';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';

function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    const fetchCheckoutData = async() => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data)
      const lesponse = await axios.get('/api/payment-summary')
      setPaymentSummary(lesponse.data)
    }
    
    fetchCheckoutData();
  })

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
          
          
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;