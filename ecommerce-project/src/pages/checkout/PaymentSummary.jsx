import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useNavigate } from "react-router";


function PaymentSummary({paymentSummary, loadCart}) {
  const navigate = useNavigate()
  const createOrder = async () => {
    await axios.post('/api/orders');
    await loadCart();
    navigate('/orders');
  }

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>
      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div data-testid='totalno'>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money" data-testid="productCost">{formatMoney(paymentSummary.productCostCents)}</div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money" data-testid="shippingCost">{formatMoney(paymentSummary.shippingCostCents)}</div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money" data-testid="beforeTax">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money" data-testid="tax">{formatMoney(paymentSummary.taxCents)}</div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money" data-testid="totalCost">{formatMoney(paymentSummary.totalCostCents)}</div>
          </div>

          <button className="place-order-button button-primary"
          onClick={createOrder} data-testid="place-order">
            Place your order
          </button>
        </>
      )}

    </div>
  );
}

export default PaymentSummary;