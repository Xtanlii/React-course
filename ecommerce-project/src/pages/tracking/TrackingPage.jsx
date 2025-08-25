import { Link, useParams } from 'react-router';
import Header from '../../components/Header';
import './TrackingPage.css';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';


function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
      
    }
    fetchTrackingData();
  }, [orderId])
  
  if (!order) { 
    return null; 
  }

  const selectedProduct = order.products.find((orderProduct) => {
      return orderProduct.productId === productId
    })

  return (
    <Fragment key={productId}>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(selectedProduct.estimatedDeliveryTimeMs).format('MMMM D')}
          </div>

          <div className="product-info">
            {selectedProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {selectedProduct.quantity}
          </div>

          <img className="product-image" src={selectedProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>




        </div>
      </div>
    </Fragment>
  );
}


export default TrackingPage;