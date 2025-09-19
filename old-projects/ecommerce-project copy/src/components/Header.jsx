import { NavLink, useNavigate, useSearchParams } from 'react-router';
import './Header.css'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import LogoWhite from '../assets/images/logo-white.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import { useState } from 'react';


function Header({cart}) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') 
  const [text, setText] = useState(search || '');
  
  const navigate = useNavigate()

  const updateText = (e) => {
    setText(e.target.value)
  }
  const searchText = () => {
    navigate(`/?search=${text}`)  
  }
  
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src={LogoWhite} />
            <img className="mobile-logo"
              src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input 
          className="search-bar" 
          type="text" 
          value={text}
          onChange={updateText}
          placeholder="Search"
           />

          <button className="search-button"
           onClick={searchText}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;