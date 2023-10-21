import React, { createElement, useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { gridStylesItemPartners, gridStylesItemProducts, gridStylesContainer } from './styles';
import AppPagination from '../Pagination/Pagination';
import usePaginationBreakpoint from '../../customHooks/usePaginationBreakpoint';

const ListItems = ({ title, items, itemComponent, actions, pagination, anchor, type }) => {
  const breakpoint = usePaginationBreakpoint();
  const productsPerPageMap = {
    mobileTablet: 10,
    lgTablet: 9,
    desktop: 12,
    lgDesktop: 15,
  };

  const [pageProducts, setPageProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(productsPerPageMap[breakpoint]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1); // к-сть сторінок

  useEffect(() => {
    setProductsPerPage(productsPerPageMap[breakpoint]);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [breakpoint]);

  useEffect(() => {
    const from = (page - 1) * productsPerPage;
    const to = page * productsPerPage;
    setPageProducts(items.slice(from, to));

    const currentPageQty = Math.ceil(items.length / productsPerPage);
    setPageQty(currentPageQty);

    if (page > currentPageQty) {
      setPage(1);
    }
  }, [items, page, productsPerPage, breakpoint]);

  // const currencies = [
  //   {
  //     value: 'Sort price 0 -> 30',
  //     label: 'Sort price 0 -> 30',
  //   },
  //   {
  //     value: 'Sort price 30 -> 0',
  //     label: 'Sort price 30 -> 0',
  //   },
  // ];
  /* <TextField
                sx={stylesSortSelect}
                id="standard-select-currency"
                size="small"
                select
                label="Select"
                defaultValue=""
                helperText="Please select your sort by"
                variant="standard"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */

  // const topOfProducts = useRef();
  return (
    <Container sx={{ mb: 13 }}>
      <Typography
        // ref={topOfProducts}
        variant="h2"
        component="h2"
        color="text.primary"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        {title}
      </Typography>
      {/* <Box sx={{ width: '100%', height: '40px', bgcolor: 'blue', mb: '10px' }} /> */}
      <Grid container spacing={0} sx={gridStylesContainer}>

        { pageProducts && pageProducts.map((item) => (

          // eslint-disable-next-line dot-notation
          <Grid key={item['_id']} item sx={type === 'partners' ? gridStylesItemPartners : gridStylesItemProducts}>

            {createElement(itemComponent, { ...item })}
          </Grid>
        ))}
      </Grid>
      {actions}
      {(pagination && pageQty > 1) && (
      <AppPagination
        page={page}
        setPage={setPage}
        pageQty={pageQty}
        anchor={anchor}
      />
      )}
      <Divider sx={{ marginTop: '67px' }} />
    </Container>
  );
};

ListItems.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  actions: PropTypes.object,
  pagination: PropTypes.bool,
  anchor: PropTypes.object,
  items: PropTypes.array,
  itemComponent: PropTypes.func,
  type: PropTypes.string,
};

ListItems.defaultProps = {
  title: '',
  actions: {},
  pagination: false,
  anchor: {},
  items: [],
  itemComponent: () => {},
  type: '',
};

export default ListItems;

// import React, { useState } from 'react';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
// import { Container, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import ProductCardItem from '../ProductCardItem/ProductCardItem';
// import RestaurantItem from '../RestaurantItem/RestaurantItem';

// const ListItemsNew = () => {
//   const [isPartners, setIsPanters] = useState(true);

//   const products = useSelector((state) => state.products.products);
//   const sortedProducts = products.slice().sort((a, b) => b.rating - a.rating).slice(0, 4);

//   const partners = useSelector((state) => state.restaurant.restaurant);
//   const sortedPartners = partners.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);

//   return (
//     <Container>
//       <Typography>title</Typography>
//       <Grid container spacing={0} sx={{ width: '100%', justifyContent: 'center' }}>
//         {!partners
//           ? (
//             sortedProducts.map((item) => (
//               <Grid item mobile={6} lgTablet={3} sx={{ pl: 1, display: 'flex',
// justifyContent: 'center', alignItems: 'center', width: { mobile: '100%', lgTablet: '20vw' } }}>
//                 <ProductCardItem />
//               </Grid>
//             ))
//           )
//           : (
//             sortedPartners.map((item) => (
//               <Grid item mobile={12} lgTablet={4} sx={{ p: 1, display: 'flex',
//  gap: 2, justifyContent: 'center', alignItems: 'center',
//  width: { mobile: '100%', lgTablet: '20vw' } }}>
//                 <RestaurantItem />
//               </Grid>
//             )))}
//       </Grid>
//     </Container>
//   );
// };

// export default ListItemsNew;
