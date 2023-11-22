import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './skeleton.module.scss';

const Skeleton = ({ skeletonType }) => {
  return (
    <div className={styles.container}>
      { skeletonType === 'restaurant' ? (
        <div data-testid="restaurant" className={styles.restaurantCardSkeleton}>
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
      ) : skeletonType === 'restaurantsPage' || skeletonType === 'oneRestaurantPage' ? (
        <div data-testid="oneRestaurantPage" className={skeletonType !== 'oneRestaurantPage' ? styles.restaurantsPageCardSkeleton : styles.oneRestaurantPageCardSkeleton}>
          <div className={classNames(styles.restaurantsPageImageSkeleton, styles.loading)} />
          <div
            className={classNames(styles.restaurantsPageChipsTitleRatingSkeleton, styles.loading)}
          />
          <div
            className={classNames(styles.restaurantsPageChipsTitleRatingSkeleton, styles.loading)}
          />
          <div
            className={classNames(styles.restaurantsPageShowMoreSkeleton, styles.loading)}
          />
        </div>
      ) : skeletonType === 'product' ? (
        <div data-testid="product" className={styles.productCardSkeleton}>
          <div className={classNames(styles.productImageSkeleton, styles.loading)} />
          <div className={classNames(styles.productChipsTitleRatingSkeleton, styles.loading)} />
          <div className={classNames(styles.productChipsTitleRatingSkeleton, styles.loading)} />
          <div className={classNames(styles.productRaitingSkeleton, styles.loading)} />
          <div className={classNames(styles.productPriceSkeleton, styles.loading)} />
        </div>
      ) : skeletonType === 'oneProductPage' ? (
        <div data-testid="oneProductPage" className={styles.oneProductPageCardSkeleton}>
          <div className={classNames(styles.oneProductPageImageSkeleton, styles.loading)} />
          <div className={styles.oneProductPageDescriptionWrapper}>
            <div className={classNames(
              styles.oneProductPageRaitingSkeleton,
              styles.loading,
            )}
            />
            <div className={classNames(
              styles.oneProductPageRaitingSkeleton,
              styles.loading,
            )}
            />
            <div className={classNames(styles.oneProductPageDescription, styles.loading)} />
            <div className={classNames(styles.oneProductPagePriceSkeleton, styles.loading)} />
          </div>
        </div>
      ) : (
        <div data-testid="reviews" className={styles.reviewCardSkeleton}>
          <div className={styles.userContainer}>
            <div className={classNames(styles.avatar, styles.loading)} />
            <div className={classNames(styles.username, styles.loading)} />
          </div>
          <div className={classNames(styles.reviewText, styles.loading)} />
          <div className={classNames(styles.rating, styles.loading)} />
        </div>
      ) }
    </div>
  );
};

export default memo(Skeleton);

Skeleton.propTypes = {
  skeletonType: PropTypes.string,
};

Skeleton.defaultProps = {
  skeletonType: '',
};
