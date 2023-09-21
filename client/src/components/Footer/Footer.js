import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Logo className="logo__footer" />
        <div className="footer__link-wrapper">
          <Link to="/Blog" className="footer__link">
            Blog
          </Link>
          <Link to="/Pricing" className="footer__link">
            Pricing
          </Link>
          <Link to="/AboutUs" className="footer__link">
            About Us
          </Link>
          <Link to="/Contact" className="footer__link">
            Contact
          </Link>
        </div>
      </div>

      <div className="footer__wrapper-social">
        <a href="###">
          <img src="./img/insta_logo.png" alt="insta_logo" />
        </a>
        <a href="###">
          <img src="./img/linkedIn_logo.png" alt="LinkedIn_logo_logo" />
        </a>
        <a href="###">
          <img src="./img/facebook_logo.png" alt="facebook_logo" />
        </a>
        <a href="###">
          <img src="./img/twitter_logo.png" alt="twitter_logo" />
        </a>
      </div>

      <div className="footer__line"> </div>
      <p className="footer__text">© 2023 EATLY All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
