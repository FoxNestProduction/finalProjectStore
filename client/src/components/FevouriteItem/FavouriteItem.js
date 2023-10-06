import React from 'react';
import { CardActions, CardContent, CardHeader, CardMedia, Container, Rating, Button, Typography, Box, Card } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ColorChips from '../Chip/Chip';
import { chipForFavourite } from '../Chip/styles';

const FavouriteItem = () => {
  const dish = {
    _id: '6507a306baee59670a047307',
    restaurant_name: 'Welcome Pizzeria',
    name: 'Margherita Pizza',
    description: 'Classic pizza with rich tomato sauce, melted cheese, and fresh basil leaves.',
    currentPrice: 12.99,
    isFavourite: false,
    isTranding: true,
    isSupreme: true,
    isHealthy: true,
    rating: 2.3,
    filterCategories: 'pizza',
    imageUrl: '../img/seaFood/crab.png',
    enabled: true,
  };

  const {
    name,
    description,
    currentPrice,
    isTranding,
    rating,
    imageUrl,
    isSupreme,
    isHealthy,
  } = dish;

  return (
    <Container>
      <Card sx={{ p: 3, height: '20vh', display: 'flex', border: '4px', borderColor: 'primary.main' }}>
        <CardMedia
          component="img"
          width="auto"
          height="100%"
          image={imageUrl}
          sx={{ width: 'fit-content', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 2px #000000A1' }}
        />
        <CardContent sx={{ py: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2%' }}>
          <Typography variant="h3" sx={{ p: 0 }}>{name}</Typography>
          <ColorChips
            isTrending={isTranding}
            isSupreme={isSupreme}
            isHealthy={isHealthy}
            customStyles={chipForFavourite}
          />
          <Rating name="half-rating" value={rating} size="small" readOnly sx={{ color: 'primary.main' }} />
          <Box>
            <Typography
              variant="h3"
            >
              $
              {currentPrice}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <FavoriteIcon />
          <Button>Add to cart</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default FavouriteItem;
