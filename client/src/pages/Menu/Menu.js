import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';

const MenuPage = () => {
  const products = useSelector((state) => state.products.items, shallowEqual);

  return (
    <>
      <RestaurantItem />
      {/* для перевірки переходу на сторінку блюда при кліку на картку блюда */}
      {products.slice(0, 6).map(({ price, imageUrl, name, rating, _id: id }) => (
        <ProductCardItem
          key={id}
          price={price}
          imageUrl={imageUrl}
          name={name}
          rating={rating}
          id={id}
        />
      ))}
    </>
  );
};

export default MenuPage;
