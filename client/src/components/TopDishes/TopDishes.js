import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from '../../customHooks/useBreakpoint';
import { instance } from '../../API/instance';
import ListItems from '../ListItems/ListItem';
import ProductCardItem from '../ProductCardItem/ProductCardItem';
import ListItemAction from '../ListItems/ListItemAction';

const TopDishes = ({ title, actions }) => {
  const [topDishes, setTopDishes] = useState([]);
  const breakpoint = useBreakpoint();

  const topDishesQtyMap = {
    mobile: 4,
    tablet: 4,
    lgTablet: 3,
    desktop: 5,
  };

  useEffect(() => {
    console.log(topDishesQtyMap[breakpoint]);
    (async () => {
      try {
        const response = await instance.get(`/products/filter?perPage=${topDishesQtyMap[breakpoint]}&sort=-rating`);
        setTopDishes(response.data.products);
      } catch (err) {
        console.error('Error getting top products: ', err);
      }
    })();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [breakpoint]);

  return (
    <ListItems
      title={title}
      topDish
      items={topDishes}
      itemComponent={ProductCardItem}
      actions={actions}
    />
  );
};

TopDishes.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.object,
};

TopDishes.defaultProps = {
  title: 'Our Top Dishes',
  actions: null,
};

export default TopDishes;
