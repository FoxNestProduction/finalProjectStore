import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

const RestaurantItem = ({ name, ...props }) => {
  console.log(props);
  const cardSize = {
    mobile: 315,
    lgTablet: 281,
    desktop: 385,
  };

  return (
    <Link to={`/restaurants/${fixedEncodeURIComponent(name)}`}>
      <RestaurantCard name={name} cardSize={cardSize} {...props} />
    </Link>
  );
};

RestaurantItem.propTypes = {
  name: PropTypes.string,
};

RestaurantItem.defaultProps = {
  name: 'The Chicken King',
};

export default RestaurantItem;

// { rating, name, imageUrl, isHealthy, isTranding, isSupreme; }
