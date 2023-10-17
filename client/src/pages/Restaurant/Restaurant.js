import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

const RestaurantPage = () => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  console.log(partners);

  return (
    <div>
      {partners.map(({ rating, name, imageUrl, description }) => (
        <Link key={name} to={`/restaurants/${fixedEncodeURIComponent(name)}`}>
          <RestaurantCard
            rating={rating}
            name={name}
            imageUrl={imageUrl}
            description={description}
          />
        </Link>
      ))}
    </div>
  );
};

export default RestaurantPage;
