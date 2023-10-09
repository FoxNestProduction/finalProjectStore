import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import Search from '../../components/Search/Search';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { partnersCardWidth, productsCardWidth } from '../../components/ListItems/styles';
import useSortedItems from '../../customHooks/useSortedItems';

const MenuPage = () => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);
  const products = useSelector((state) => state.products.products);
  const sortedProducts = useSortedItems(products, productsCardWidth);

  return (
    <>
      <Search />
      <ListItems title="Our Top Restaurants" items={sortedPartners} itemComponent={RestaurantItem} actions={<ListItemAction />} type="partners" />
      <ListItems title="Our Top Dishes" items={sortedProducts} itemComponent={ProductCardItem} actions={<ListItemAction />} />
      {/* для перевірки переходу на сторінку блюда при кліку на картку блюда */}
      {/* {products.slice(0, 6).map(({ price, imageUrl, name, rating, _id: id }) => ( */}
      {/*  <ProductCardItem */}
      {/*    key={id} */}
      {/*    price={price} */}
      {/*    imageUrl={imageUrl} */}
      {/*    name={name} */}
      {/*    rating={rating} */}
      {/*    id={id} */}
      {/*  /> */}
      {/* ))} */}
    </>
  );
};

export default MenuPage;
