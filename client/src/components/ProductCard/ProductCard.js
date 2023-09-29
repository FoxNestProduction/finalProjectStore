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

const ProductCard = () => {
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
      }}
    >
      <Card
        component="section"
        sx={{
          bgcolor: 'background.default',
          boxShadow: 'none',
          borderRadius: 0,
          mb: { mobile: '60px', tablet: '100px' },
        }}
      >
        <CardHeader
          variant="h5"
          component="h3"
          title="Name Dish"
          sx={{
            pb: 3,
            pt: 5,
            textAlign: 'center',
            display: { desktop: 'none' },
          }}
        />
        <Stack
          sx={{
            display: 'flex',
            flexDirection: { mobile: 'column', desktop: 'row' },
            gap: { desktop: '3vw' },
          }}
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
              sx={{
                p: 0,
                textAlign: 'start',
                display: { mobile: 'none', desktop: 'block' },
              }}
            />
            <Stack
              sx={{
                flexDirection: { mobile: 'row', desktop: 'column' },
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Chip />
              <Stack
                direction="row"
                sx={{
                  justifyContent: { tablet: 'flex-end', desktop: 'flex-start' },
                  gap: { mobile: 2, tablet: 16 },
                  mb: { desktop: 4 },
                }}
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
                sx={{
                  textAlign: 'justify',
                }}
              >
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { mobile: 'flex-end', desktop: 'flex-start' },
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3 }}
              >
                $12.99
              </Typography>
            </Box>
            <CardActions
              sx={{
                justifyContent: {
                  mobile: 'space-between',
                  tablet: 'flex-end',
                  desktop: 'space-between',
                },
                gap: {
                  mobile: 0,
                  tablet: '20px',
                  desktop: 0,
                },
                p: 0,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: '14px',
                  color: 'text.primary',
                  border: 1,
                  fontSize: { tablet: '18px', desktop: '22px' },
                }}
              >
                Favourite
                <FavoriteBorderOutlinedIcon
                  fontSize="medium"
                  sx={{ ml: 1 }}
                />
              </Button>
              <Button
                variant="contained"
                sx={{
                  p: 2,
                  borderRadius: '14px',
                  fontSize: { tablet: '18px', desktop: '22px' },
                }}
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
