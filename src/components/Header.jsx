import React from 'react'
import logo from "../assets/investment-calculator-logo.png"
function Header() {
  return (
    <div id='header' > 
        <h1>React Investment Calculator</h1>
      <img src={logo} alt='logo.png'/>
    </div>
  )
}

export default Header
