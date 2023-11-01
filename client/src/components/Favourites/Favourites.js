import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FavouriteItem from '../FavouriteItem/FavouriteItem';
import ListItems from '../ListItems/ListItem';
import ProductCardItem from '../ProductCardItem/ProductCardItem';
import { getProducts } from '../../redux/slices/productsSlice';

const Favourites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLgTablet = useMediaQuery('(min-width: 690px)');
  const products = useSelector((state) => state.products.products, shallowEqual);
  const favourite = useSelector((state) => state.favourites.favourites);

  const handlMenuClick = () => {
    navigate('/menu');
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  // eslint-disable-next-line no-underscore-dangle
  const favouritesList = favourite.map((item) => products.find((product) => product._id === item));

  return (
    <Box>
      {favourite.length !== 0 ? (
        <Box sx={{ mb: '300px' }}>
          {isLgTablet
            && (
              <Container sx={{ backgroundColor: 'background.default' }}>
                <Typography
                  variant="h2"
                  component="h3"
                  sx={{ textAlign: 'center', mb: '30px' }}
                >
                  Favourites
                </Typography>
                <Stack direction="column" spacing={3}>
                  {favourite.map((item) => <FavouriteItem key={item} product={item} />)}
                </Stack>
              </Container>
            )}
          {!isLgTablet
            && (
              <ListItems
                title="Favourites"
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
              sx={{
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.hover',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                  color: 'text.primaryLight',
                },
                '&:active': {
                  backgroundColor: 'common.white',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                  color: 'primary.main',
                  border: '1px solid',
                },
              }}
            >
              Back to menu
            </Button>
          </Stack>
        </Container>
      )}
    </Box>
  );
};

export default Favourites;
