import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useLocation } from "@reach/router"
import logo from '../img/logo.svg'
import Hamburger from "../img/Hamburger"

const Navbar = () => {
  const location = useLocation()
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav role="navigation" aria-label="main-navigation">
      <div className="nav-bar-logo">
        <Link to='/' title='Logo'>
          <img src={logo} alt="Elblohmarkt" />
        </Link>
      </div>
      <div className={`nav-bar-menu${toggleMenu ? " nav-bar-menu-active" : ""}`}>
        <Link className="nav-bar-item-wrapper" to='/'> <span className={`nav-bar-item ${location.pathname === "/" ? 'nav-bar-item-active' : ''}`} >Home</span></Link>
        <Link className="nav-bar-item-wrapper" to='/ueber-uns'> <span className={`nav-bar-item ${location.pathname === "/ueber-uns" ? 'nav-bar-item-active' : ''}`} >Über uns</span></Link>
        <Link className="nav-bar-item-wrapper" to='/kontakt'> <span className={`nav-bar-item ${location.pathname === "/kontakt" ? 'nav-bar-item-active' : ''}`} >Kontakt</span></Link>
        <Link className="nav-bar-item-wrapper" to='/termine'> <span className={`nav-bar-item ${location.pathname === "/termine" ? 'nav-bar-item-active' : ''}`} >Termine</span></Link>
      </div>
      <button title="Toggle Main Menu" className="nav-bar-toggle" aria-label="Toggle main menu" onClick={() => setToggleMenu(!toggleMenu)}> <Hamburger /></button>

    </nav>
  )
}

export default Navbar