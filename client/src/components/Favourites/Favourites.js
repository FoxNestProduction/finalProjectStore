import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import FavouriteItem from '../FavouriteItem/FavouriteItem';
import ListItems from '../ListItems/ListItem';
import ProductCardItem from '../ProductCardItem/ProductCardItem';
import buttonBackToMenu from './styles';

const Favourites = () => {
  const navigate = useNavigate();
  const isLgTablet = useMediaQuery('(min-width: 690px)');

  const handlMenuClick = () => {
    navigate('/menu');
  };

  // eslint-disable-next-line no-underscore-dangle
  const favouritesList = useSelector((state) => state.favourites.favourites, shallowEqual);
  const loading = useSelector((state) => state.favourites.loading);
  const error = useSelector((state) => state.favourites.error);

  return (
    <Box position="relative">
      {favouritesList.length !== 0 ? (
        <Box sx={{ mb: '300px', pt: { mobile: '40px', lgTablet: '60px' } }}>
          { isLgTablet && favouritesList
          && (
          <Container sx={{ backgroundColor: 'background.default' }}>
            <Typography variant="h2" component="h3" sx={{ textAlign: 'center', mb: { lgTablet: '34px', desktop: '28px' } }}>Favourite</Typography>
            <Stack direction="column" spacing={3}>
              { favouritesList.map((item) => (
                <Box key={item._id}>
                  <FavouriteItem product={item} />
                </Box>
              ))}
            </Stack>
          </Container>
          )}
          { !isLgTablet && favouritesList
          && (
          <ListItems
            title="Favourite"
            items={favouritesList}
            itemComponent={ProductCardItem}
            actions={null}
          />
          )}
        </Box>
      ) : (
        <Container>
          <Stack direction="column" sx={{ justifyContent: 'center', alignItems: 'center', gap: 5, my: 10 }}>
            <Typography variant="h2" color="primary.main" sx={{ textAlign: 'center' }}>Oops! your wishlist is empty</Typography>
            <Typography variant="h3" color="text.secondary">Fill it with dishes</Typography>
            <Button
              variant="contained"
              onClick={handlMenuClick}
              sx={buttonBackToMenu}
            >
              Back to menu
            </Button>
          </Stack>
        </Container>
      )}
      {loading
      && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
          <LinearProgress />
        </Box>
      )}
      {error && <div>{error.statusText}</div>}
    </Box>
  );
};

export default Favourites;
