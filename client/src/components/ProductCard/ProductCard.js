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

const ProductCard = () => {
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
      }}
    >
      <Card
        component="section"
        sx={stylesSectionCard}
      >
        <CardHeader
          variant="h5"
          component="h3"
          title="Name Dish"
          sx={stylesHeaderTopCard}
        />
        <Stack
          sx={stylesContentCard}
        >
          <CardMedia
            component="img"
            image="../img/seaFood/crab.png"
            alt="lobster"
            sx={{ mb: 3, width: { mobile: '100%', desktop: '52%' } }}
          />
          <Stack>
            <CardHeader
              variant="h5"
              component="h3"
              title="Name Dish"
              sx={stylesHeaderInCard}
            />
            <Stack
              sx={stylesLabelCard}
            >
              <Box sx={{ position: 'relative', left: '-32px' }}>
                <Chip />
              </Box>
              <Stack
                direction="row"
                sx={stylesRatingCard}
              >
                <Typography variant="subtitle1">24min •</Typography>
                <Stack direction="row" spacing={1}>
                  <StarRoundedIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="subtitle1">4.2</Typography>
                </Stack>
              </Stack>
            </Stack>
            <CardContent sx={{ p: 0, my: 3 }}>
              <Typography
                variant="description"
                component="p"
                sx={{ textAlign: 'justify' }}
              >
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like
              </Typography>
            </CardContent>
            <Box
              sx={stylesPriceCard}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3 }}
              >
                $12.99
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
