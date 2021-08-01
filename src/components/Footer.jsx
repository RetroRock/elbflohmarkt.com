import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import Facebook from '../img/social/Facebook'
import Instagram from '../img/social/Instagram'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="flex-column" id="contact" >
          <span><strong>Elbflohmarkt</strong> kontaktieren:</span>
          <a href="mailto:kontakt@elblohmarkt.com">
            kontakt@elblohmarkt.com
          </a>
        </div>
        <div id="logo">
          <Link to="/">
            <img
              src={logo}
              alt="Elbflohmarkt"
            />
          </Link>
        </div>
        <div id='socialMedia'>
          <a title="facebook" href="https://www.facebook.com/profile.php?id=100069239259719">
            <Facebook alt="Facebook" />
          </a>
          <a title="instagram" href="https://instagram.com/elbflohmarkt">
            <Instagram alt="Instagram" />
          </a>
        </div>
      </footer>
    )
  }
}

export default Footer
