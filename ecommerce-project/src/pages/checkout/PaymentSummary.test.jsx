import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from "react-router";
import userEvent from '@testing-library/user-event';
import PaymentSummary from './PaymentSummary';
import axios from "axios";



vi.mock('axios');
let user;
let loadCart;
let paymentSummary;

function Location() {
  const Location = useLocation();
  return(
    <div data-testid="url-path">{Location.pathname}</div>
  )
}

describe('tests for paymentSummary', () => {
  beforeEach(() => {
    user = userEvent.setup();
    loadCart = vi.fn();
    paymentSummary = {
      "totalItems": 8,
      "productCostCents": 10439,
      "shippingCostCents": 499,
      "totalCostBeforeTaxCents": 10938,
      "taxCents": 1094,
      "totalCostCents": 12032
    }
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    )
  })

  it('checks the data', async () => {
    expect(
      screen.getByTestId('totalno')
    ).toHaveTextContent('Items (8):');

    expect(
      screen.getByTestId('productCost')
    ).toHaveTextContent('$104.39');

    expect(
      screen.getByTestId('shippingCost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('beforeTax')
    ).toHaveTextContent('$109.38');

    expect(
      screen.getByTestId('tax')
    ).toHaveTextContent('$10.94');

    expect(
      screen.getByTestId('totalCost')
    ).toHaveTextContent('$120.32');
  })

  it('test the place order button', async () => {
    const placeOrderBtn = await screen.getByTestId('place-order')
    await user.click(placeOrderBtn);

    expect(axios.post).toHaveBeenCalledWith('/api/orders')
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders')
    
  })
})