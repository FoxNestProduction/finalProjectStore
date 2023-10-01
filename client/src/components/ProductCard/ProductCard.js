import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Chip from '../Chip/Chip';
import { stylesButtonCard, stylesButtonCardOutline, stylesSectionCard, stylesHeaderTopCard, stylesHeaderInCard, stylesContentCard, stylesActionsCard, stylesPriceCard, stylesRatingCard, stylesLabelCard } from './styles';
import RatingItem from '../Rating/Rating';

const ProductCard = () => {
  const dish = {
    _id: '6507a306baee59670a047307',
    restaurant_name: 'Welcome Pizzeria',
    name: 'Margherita Pizza',
    description: 'Classic pizza with rich tomato sauce, melted cheese, and fresh basil leaves. A delightful combination of flavors that will satisfy your cravings.',
    currentPrice: 12.99,
    isFavourite: false,
    isTranding: true,
    isSupreme: false,
    isHealthy: false,
    rating: 2.8,
    filterCategories: 'pizza',
    imageUrl: '../img/pizza/pizza_texas.png',
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
    <Container
      sx={{
        bgcolor: 'background.default',
        mt: { mobile: 5, tablet: 8 },
      }}
    >
      <Card
        component="section"
        sx={stylesSectionCard}
      >
        <CardHeader
          variant="h5"
          component="h3"
          title={name}
          sx={stylesHeaderTopCard}
        />
        <Stack
          sx={stylesContentCard}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt="lobster"
            sx={{ mb: 3, width: { mobile: '100%', desktop: '52%' } }}
          />
          <Stack>
            <CardHeader
              variant="h5"
              component="h3"
              title={name}
              sx={stylesHeaderInCard}
            />
            <Stack
              sx={stylesLabelCard}
            >
              <Box sx={{ position: 'relative', left: '-32px' }}>
                <Chip isTrending={isTranding} isSupreme={isSupreme} isHealthy={isHealthy} />
              </Box>
              {/* <RatingItem /> */}
              <Stack
                direction="row"
                sx={stylesRatingCard}
              >
                <Typography variant="subtitle1">24min •</Typography>
                <Stack direction="row" spacing={1}>
                  <StarRoundedIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="subtitle1">{rating}</Typography>
                </Stack>
              </Stack>
            </Stack>
            <CardContent sx={{ p: 0, my: 3 }}>
              <Typography
                variant="description"
                component="p"
                sx={{ textAlign: 'justify' }}
              >
                {description}
              </Typography>
            </CardContent>
            <Box
              sx={stylesPriceCard}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3 }}
              >
                {currentPrice}
              </Typography>
            </Box>
            <CardActions
              sx={stylesActionsCard}
            >
              <Button
                variant="outlined"
                sx={stylesButtonCardOutline}
              >
                Favourite
                <FavoriteBorderOutlinedIcon
                  fontSize="medium"
                  sx={{ ml: 1 }}
                />
              </Button>
              <Button
                variant="contained"
                sx={stylesButtonCard}
              >
                Add to card
                <AddBoxOutlinedIcon
                  fontSize="medium"
                  sx={{ ml: 1 }}
                />
              </Button>
            </CardActions>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

export default ProductCard;
