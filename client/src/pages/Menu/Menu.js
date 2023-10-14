import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import Search from '../../components/Search/Search';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { setSearch } from '../../redux/slices/searchSlice';
import { partnersCardWidth, productsCardWidth } from '../../components/ListItems/styles';
import useSortedItems from '../../customHooks/useSortedItems';
import Filter from '../../components/Filter/Filter';
import SwiperBanner from '../../components/SwiperBanner/SwiperBanner';

const MenuPage = () => {
  const dispatch = useDispatch();
  const itemsFromSearch = useSelector((state) => state.search.search);
  const keyFromSearch = useSelector((state) => state.search.key);
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);
  const products = useSelector((state) => state.products.products);
  const sortedProducts = useSortedItems(products, productsCardWidth);

  useEffect(() => {
    dispatch(setSearch([]));
  }, [dispatch]);

  return (
    <>
      <Container sx={{ mt: { mobile: '62px', tablet: '85px', desktop: '50px' } }}>
        <Box
          sx={{
            // mt: { mobile: '62px', tablet: '85px', desktop: '50px' },
            // height: '100%',
            justifyContent: 'center',
            display: 'grid',
            gridTemplateAreas: {
              mobile: `"a"
            "b"
            "c"`,
              tablet: `"a"
              "b"
              "c"`,
              lgTablet: `"a b"            
            "c b"`,
              desktop: `"a b"              
              "c b"`,
            },
            gridTemplateColumns: {
              mobile: '1fr',
              tablet: '1fr',
              lgTablet: '2fr 1fr',
            },
            columnGap: {
              mobile: 0,
              tablet: '1vw',
              desktop: '3vw',
            },
            rowGap: {
              mobile: '10vh',
              tablet: '4vh',
              desktop: '5vh',
            },
            gridTemplateRows: {
              mobile: 'auto',
              tablet: 'auto',
              lgTablet: '2.2fr 0.8fr',
            },
          }}
        >
          <Box
            sx={{
              gridArea: 'a',
              alignSelf: 'center',
            }}
          >
            <SwiperBanner />
          </Box>
          <Box sx={{ gridArea: 'b', alignSelf: 'start' }}>
            <Filter />
          </Box>
          <Box sx={{ gridArea: 'c', alignSelf: 'end' }}>
            <Search />
          </Box>
        </Box>
      </Container>

      <ListItems
        title={itemsFromSearch.length !== 0 && (keyFromSearch === 'food' ? 'Our Dishes' : 'Our Restaurants')}
        items={itemsFromSearch}
        itemComponent={keyFromSearch === 'food' ? ProductCardItem : RestaurantItem}
        actions={null}
        type={keyFromSearch === 'food' ? '' : 'partners'}
      />

      {/* <RestaurantItem /> */}
      <ListItems
        title="Our Top Restaurants"
        items={sortedPartners}
        itemComponent={RestaurantItem}
        actions={<ListItemAction />}
        type="partners"
      />
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
