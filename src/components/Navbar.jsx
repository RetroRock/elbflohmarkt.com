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
        <Link className={`navbar-item ${location.pathname === "/" ? 'nav-bar-item-active' : ''}`} to='/'>Home</Link>
        <Link className={`navbar-item ${location.pathname === "/ueber-uns" ? 'nav-bar-item-active' : ''}`} to='/ueber-uns'>Über uns</Link>
        <Link className={`navbar-item ${location.pathname === "/kontakt" ? 'nav-bar-item-active' : ''}`} to='/kontakt'>Kontakt</Link>
        <Link className={`navbar-item ${location.pathname.match("/termine") ? 'nav-bar-item-active' : ''}`} to='/termine'>Termine</Link>
      </div>
      <button title="Toggle Main Menu" className="nav-bar-toggle" aria-label="Toggle main menu" onClick={() => setToggleMenu(!toggleMenu)}> <Hamburger /></button>

    </nav>
  )
}

export default Navbar