import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FavouriteItem from '../FevouriteItem/FavouriteItem';
import ListItems from '../ListItems/ListItem';

const Favourites = () => {
  const isXsMobile = useMediaQuery('(max-width: 390px)');
  const isXsTablet = useMediaQuery('(min-width: 481px) and (max-width: 600px)');
  const isLgTablet = useMediaQuery('(min-width: 690px)');

  return (
    <Container sx={{ backgroundColor: 'background.default', pt: { mobile: '40px', lgTablet: '60px' } }}>
      <Typography variant="h2" component="h3" sx={{ textAlign: 'center', mb: { lgTablet: '34px', desktop: '28px' } }}>Favourite</Typography>
      { isLgTablet && (<FavouriteItem />) }
    </Container>
  );
};

export default Favourites;
