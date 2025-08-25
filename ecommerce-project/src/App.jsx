import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import './App.css'
import TrackingPage from './pages/TrackingPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  
  const [cart, setCart] = useState([])
  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      })

  }, []);
  return (
  <Routes>
    <Route index element={<HomePage cart={cart} />} />
    <Route path="checkout" element={<CheckoutPage cart={cart} />} />
    <Route path="orders" element={<OrdersPage cart= {cart} />} />
    <Route path="tracking" element={<TrackingPage />} />
    <Route path="*" element={<ErrorPage />} />
    
  </Routes>
)
  
}

export default App
