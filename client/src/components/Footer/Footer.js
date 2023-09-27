import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import Logo from '../Logo/Logo';
import { ReactComponent as InstagramIcon } from '../../assets/svg/instagram_logo.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/svg/linkedIn_logo.svg';
import { ReactComponent as FacebookIcon } from '../../assets/svg/facebook_logo.svg';
import { ReactComponent as TwitterIcon } from '../../assets/svg/twitter_logo.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <Logo className={styles.logo} classNameIcon={styles.logoIcon} />
        <div className={styles.linkWrapper}>
          <Link to="/Blog" className={styles.link}>
            Blog
          </Link>
          <Link to="/Pricing" className={styles.link}>
            Pricing
          </Link>
          <Link to="/AboutUs" className={styles.link}>
            About Us
          </Link>
          <Link to="/Contact" className={styles.link}>
            Contact
          </Link>
        </div>
      </div>

      <div className={styles.wrapperSocial}>
        <a href="###">
          <InstagramIcon className={styles.socialIcon} />
        </a>
        <a href="###">
          <LinkedInIcon className={styles.socialIcon} />
        </a>
        <a href="###">
          <FacebookIcon className={styles.socialIcon} />
        </a>
        <a href="###">
          <TwitterIcon className={styles.socialIcon} />
        </a>
      </div>

      <div className={styles.line}> </div>
      <p className={styles.text}>© 2023 EATLY All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
