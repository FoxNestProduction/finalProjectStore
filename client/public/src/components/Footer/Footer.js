import React from 'react';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <Logo />
        <div className="footer__link-wrapper">
          <a className="footer__link" href="###">
            Blog
          </a>
          <a className="footer__link" href="###">
            Pricing
          </a>
          <a className="footer__link" href="###">
            About Us
          </a>
          <a className="footer__link" href="###">
            Contact
          </a>
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
