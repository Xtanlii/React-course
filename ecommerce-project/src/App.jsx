import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import './App.css'
import TrackingPage from './pages/tracking/TrackingPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  const [cart, setCart] = useState([])
  useEffect(() => {
    const getCartData = async() => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);  
    }
    getCartData();
  }, []);

  return (
  <Routes>
    <Route index element={<HomePage cart={cart} />} />
    <Route path="checkout" element={<CheckoutPage cart={cart} />} />
    <Route path="orders" element={<OrdersPage cart= {cart} />} />
    <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
    <Route path="*" element={<ErrorPage cart={cart} />} />
    
  </Routes>
)
  
}

export default App
