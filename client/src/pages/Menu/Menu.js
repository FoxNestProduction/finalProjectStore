import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import Search from '../../components/Search/Search';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import { gridWidthRestaurant } from '../../components/ListItems/styles';
import ListItems from '../../components/ListItems/ListItem';
import { setSearch } from '../../redux/slices/searchSlice';

const MenuPage = () => {
  const dispatch = useDispatch();
  const itemsFromSearch = useSelector((state) => state.search.search);
  const key = useSelector((state) => state.search.key);
  console.log(itemsFromSearch);
  // const products = useSelector((state) => state.products.items, shallowEqual);

  useEffect(() => {
    dispatch(setSearch([]));
  }, [dispatch]);

  return (
    <>
      <Search />
      <ListItems
        title={itemsFromSearch.length !== 0 && (key === 'food' ? 'Our Dishes' : 'Our Restaurants')}
        items={itemsFromSearch}
        itemComponent={key === 'food' ? ProductCardItem : RestaurantItem}
        actions={null}
        count={3}
        gridProps={gridWidthRestaurant}
      />
      {/* <RestaurantItem /> */}
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
