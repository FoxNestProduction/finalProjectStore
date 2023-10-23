import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './skeleton.module.scss';

const Skeleton = ({ skeletonType }) => {
  return (
    <div className={styles.container}>
      { skeletonType === 'restaurant' ? (
        <div className={styles.restaurantCardSkeleton}>
          <div className={classNames(styles.restaurantImageSkeleton, styles.loading)} />
          <div
            className={classNames(styles.restaurantChipsTitleRatingSkeleton, styles.loading)}
          />
          <div
            className={classNames(styles.restaurantChipsTitleRatingSkeleton, styles.loading)}
          />
          <div
            className={classNames(styles.restaurantChipsTitleRatingSkeleton, styles.loading)}
          />
        </div>
      ) : skeletonType === 'product' ? (
        <div className={styles.productCardSkeleton}>
          <div className={classNames(styles.productImageSkeleton, styles.loading)} />
          <div className={classNames(styles.productChipsTitleRatingSkeleton, styles.loading)} />
          <div className={classNames(styles.productChipsTitleRatingSkeleton, styles.loading)} />
          <div className={classNames(styles.productRaitingSkeleton, styles.loading)} />
          <div className={classNames(styles.productPriceSkeleton, styles.loading)} />
        </div>
      ) : (
        <div className={styles.reviewsCardSkeleton}>
          <div className={classNames(styles.chipsTitleRatingSkeleton, styles.loading)} />
          <div className={classNames(styles.chipsTitleRatingSkeleton, styles.loading)} />
          <div className={classNames(styles.chipsTitleRatingSkeleton, styles.loading)} />
        </div>
      ) }
    </div>
  );
};

export default Skeleton;

Skeleton.propTypes = {
  skeletonType: PropTypes.string.isRequired,
};
