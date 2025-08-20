import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import './App.css'
import TrackingPage from './pages/TrackingPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="orders" element={<OrdersPage />} />
    <Route path="tracking" element={<TrackingPage />} />
    <Route path="*" element={<ErrorPage />} />
    
  </Routes>
)
  
}

export default App
