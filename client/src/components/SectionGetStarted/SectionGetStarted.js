import React from 'react';
import { Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './getStarted.module.scss';

const SectionGetStarted = () => {
  const value = 4;
  return (
    <section className={`container ${styles.getStarted}`}>
      <span className={styles.getStarted__usersLabel}>OVER 1000 USERS</span>
      <h1 className={styles.getStarted__title}>
        Enjoy Foods All
        <br />
        Over The World
      </h1>
      <p className={styles.getStarted__description}>
        {/* eslint-disable-next-line max-len */}
        Eatly help you set saving goals, earn cash back offers, Go to disclaimer for more details and get paychecks up to two days early. Get a $20 bonus.
      </p>
      <div className={styles.getStarted__linksWrapper}>
        <Link className={styles.getStarted__linksWrapper_getStartedLink} to="/menu">Get Started</Link>
        <Link className={styles.getStarted__linksWrapper_goProLink} to="/Pricing">Go Pro</Link>
      </div>
      <div className={styles.getStarted__rating}>
        <img src="/img/layout/trustpilotIcon.png" alt="" />
        <span className={styles.getStarted__rating_trustpilot}>Trustpilot</span>
        <Rating name="read-only" value={value} readOnly />
        <span className={styles.getStarted__rating_numberOfReviews}>4900+</span>
      </div>
      <div className={styles.getStarted__imgWrapper}>
        <img src="/img/layout/getStartedSectionImage.jpg" alt="" />
      </div>
    </section>
  );
};

export default SectionGetStarted;
