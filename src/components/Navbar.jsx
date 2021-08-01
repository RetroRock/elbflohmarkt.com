import React, { useState } from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import Hamburger from "../img/Hamburger"

export default function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav role="navigation" aria-label="main-navigation">
      <div className="nav-bar-logo">
        <Link to='/' title='Logo'>
          <img src={logo} alt="Elblohmarkt" />
        </Link>
      </div>
      <div className={`nav-bar-menu${toggleMenu ? " nav-bar-menu-active" : ""}`}>
        <Link className="navbar-item" to='/'>Home</Link>
        <Link className="navbar-item" to='/ueber-uns'>Über uns</Link>
        <Link className="navbar-item" to='/kontakt'>Kontakt</Link>
        <Link className="navbar-item" to='/termine'>Termine</Link>
      </div>
      <button title="Toggle Main Menu" className="nav-bar-toggle" aria-label="Toggle main menu" onClick={() => setToggleMenu(!toggleMenu)}> <Hamburger /></button>

    </nav>
  )
}
