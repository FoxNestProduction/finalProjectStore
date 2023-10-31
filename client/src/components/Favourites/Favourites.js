import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FavouriteItem from '../FavouriteItem/FavouriteItem';
import ListItems from '../ListItems/ListItem';
import ProductCardItem from '../ProductCardItem/ProductCardItem';

const Favourites = () => {
  const isMobile = useMediaQuery('(max-width: 690px)');
  const isLgTablet = useMediaQuery('(min-width: 690px)');

  // eslint-disable-next-line no-underscore-dangle
  const favouritesList = useSelector((state) => state.favourites.favourites, shallowEqual);

  return (
    <Box sx={{ mb: '300px', pt: { mobile: '40px', lgTablet: '60px' } }}>
      { isLgTablet
        && (
          <Container sx={{ backgroundColor: 'background.default' }}>
            <Typography variant="h2" component="h3" sx={{ textAlign: 'center', mb: { lgTablet: '34px', desktop: '28px' } }}>Favourite</Typography>
            <Stack direction="column" spacing={3}>
              { favouritesList.map((item) => <FavouriteItem key={item._id} product={item} />)}
            </Stack>
          </Container>
        )}
      { isMobile
        && (
          <ListItems
            title="Favourite"
            items={favouritesList}
            itemComponent={ProductCardItem}
            actions={null}
          />
        )}
    </Box>
  );
};

export default Favourites;
