import React, { useEffect } from 'react';
import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes, { bool, string } from 'prop-types';
import classNames from 'classnames';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import Search from '../../components/Search/Search';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import ListItems from '../../components/ListItems/ListItem';
import { setSearch } from '../../redux/slices/searchSlice';
import { partnersCardWidth, productsCardWidth } from '../../components/ListItems/styles';
import useSortedItems from '../../customHooks/useSortedItems';
import Sorter from '../../components/Sorter/Sorter';
import styles from './styles.module.scss';
import useBreakpoint from '../../customHooks/useBreakpoint';

const MenuPage = () => {
  const breakpoint = useBreakpoint();
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
      {breakpoint === 'mobile' ? (
        <Container sx={{ mt: { mobile: '62px', tablet: '85px', desktop: '50px' }, height: '100%' }}>
          <Stack direction="column" gap={4} alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Box sx={{ height: '350px', width: '100%', bgcolor: 'primary.main' }} />
            <Sorter />
            <Search />
          </Stack>
        </Container>
      ) : (
        <Container sx={{ mt: { mobile: '62px', tablet: '85px', desktop: '50px' }, height: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Stack direction="column" gap={4} alignItems="start" justifyContent="flex-end" sx={{ width: '65%', height: '100%' }}>
              <Box sx={{ height: '350px', width: '100%', bgcolor: 'primary.main' }} />
              <Search />
            </Stack>
            <Sorter />
          </Stack>
        </Container>
      )}
      {/* <Container sx={{ mt: { mobile: '62px', tablet: '85px',
      desktop: '50px' }, height: '100%' }}>
        <Stack
          direction={{ mobile: 'column', tablet: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Stack direction="column" gap={4} alignItems="start" justifyContent="flex-end"
          sx={{ width: '65%', height: '100%' }}>
            <Box sx={{ height: '350px', width: '100%', bgcolor: 'primary.main' }} />
            <Search />
          </Stack>
          <Sorter />
        </Stack>
      </Container> */}

      {/* <Container sx={{ mt: { mobile: '62px', tablet:
      '85px', desktop: '50px' }, height: '100%' }}>
        <div
          className={styles.gridConteiner}

          // style={{
          //   // mt: { mobile: '62px', tablet: '85px', desktop: '50px' },
          //   height: '100%',
          //   display: 'grid',
          //   gridTemplateAreas: `"a a b"
          //   "a a b"
          //   "c c b"`,
          //   gridTemplateColumns: 'repeat(3, 1fr)',
          //   gap: 1,
          //   gridTemplateRows: 'repeat(3, 1fr)',
          //   // gridTemplateAreas: `"search search sorter"
          //   // "discounts discounts sorter"
          //   // "discounts discounts sorter"`,
          // }}
        >
          <Box sx={{ gridArea: 'a', height: '485px', width: '100%', bgcolor: 'primary.main' }} />
          <Sorter sx={{ gridArea: 'b', height: '720px' }} />
          <Search sx={{ gridArea: 'c' }} />
        </div>
      </Container> */}

      {/* <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 1,
        }}
      >
        <Box sx={{ gridColumn: '1 / 2', gridRow: '1 / 2', height: '485px',
        width: '100%', bgcolor: 'primary.main' }} />
        <Sorter sx={{ gridColumn: '3 / 3', gridRow: '1 / 3' }} />
        <Search sx={{ gridColumn: '1 / 2', gridRow: '3 / 3' }} />
      </Box> */}

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

// MenuPage.propTypes = {
//   style: PropTypes.string, // eslint-disable-next-line
// };

MenuPage.defaultProps = {
  style: '',
};

export default MenuPage;
