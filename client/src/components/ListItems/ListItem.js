import React, { createElement } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { gridStylesItemPartners, gridStylesItemProducts, gridStylesContainer } from './styles';
import Skeleton from '../Skeleton/Skeleton';

const ListItems = ({ title, items, itemComponent, actions, type }) => {
  const isLoading = useSelector((state) => state.skeleton.isLoading);
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

  return (
    <Container sx={{ mb: 13 }}>
      <Typography
        variant="h2"
        component="h2"
        color="text.primary"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        {title}
      </Typography>
      {/* <Box sx={{ width: '100%', height: '40px', bgcolor: 'blue', mb: '10px' }} /> */}
      <Grid container spacing={0} sx={gridStylesContainer}>

        { !isLoading ? items.map((item) => (

          // eslint-disable-next-line dot-notation
          <Grid key={item['_id']} item sx={type === 'partners' ? gridStylesItemPartners : gridStylesItemProducts}>

            {createElement(itemComponent, { ...item })}
          </Grid>
        )) : type === 'partners' ? (
          <>
            <Skeleton
              style={{
                flexWrap: 'wrap',
                maxWidth: {
                  mobile: 315,
                  lgTablet: 281,
                  desktop: 385,
                },
                boxShadow: '6px 71px 35px 0px rgba(229, 229, 229, 0.70)',
                '&:hover .MuiCardMedia-img': {
                  transform: 'scale(1.05)',
                },
              }}
              skeletonType="restaurant"
            />
            <Skeleton skeletonType="restaurant" />
            <Skeleton skeletonType="restaurant" />
          </>
        ) : (
          <>
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
          </>
        )}
      </Grid>
      {actions}
    </Container>
  );
};

ListItems.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  actions: PropTypes.object,
  items: PropTypes.array,
  itemComponent: PropTypes.func,
  type: PropTypes.string,
};

ListItems.defaultProps = {
  title: '',
  actions: {},
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
