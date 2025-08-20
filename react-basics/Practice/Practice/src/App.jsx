import { useState } from 'react'
import './App.css'


function App() {
  const [showPassword,setShowPassword] = useState(true)
  
  function hideButton() {
    showPassword === true 
    ? setShowPassword(false)
    : setShowPassword(true)
  } 

  return (
    <>
      <p className="welcome"> Hello, welcome to my website</p>
      <div className="input-container">
      <input className="email-input" placeholder="Email"/>
      <div>
      <input 
      type={showPassword === true
        ? "text"
        : "password"
      }
        className="password-input" placeholder="Password" />
      <button onClick={hideButton} className="show">{showPassword === true ? 'hide' : 'show'}</button>
      </div>
      </div>
      <button className="login-button">Login</button>
      <button className="sign-button">Sign up</button>
      
    </>
  )
}
  

export default App
