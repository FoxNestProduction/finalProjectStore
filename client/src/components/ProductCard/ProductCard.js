import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const ProductCard = () => {
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
      }}
    >
      <Card
        sx={{ bgcolor: 'background.default', boxShadow: 'none' }}
      >
        <CardHeader
          // variant="h5"
          title="Name Dish"
          sx={{ pb: 3, pt: 5, textAlign: 'center' }}
        />
        <CardMedia
          component="img"
          //  height=""
          image="./img/seaFood/norwegian_lobster.png"
          alt="lobster"
        />
        <Grid container spacing={2}>
          <Grid item>
            Healsy
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              24min •
            </Typography>
          </Grid>
          <Grid item>
            <StarRoundedIcon sx={{ color: 'primary.main' }} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              4.2
            </Typography>
          </Grid>
        </Grid>
        <CardContent>
          <Typography
            variant="description"
            sx={{ px: 0 }}
          >
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like
          </Typography>
        </CardContent>
        <CardActions
          sx={{ spacing: 8, justifyContent: ' space-between' }}
        >
          <Button
            variant="outlined"
            sx={{ px: 3, py: 2, borderRadius: '12px', color: 'text.primary', border: 1 }}
          >
            Favourite
            <FavoriteBorderOutlinedIcon fontSize="medium" sx={{ ml: 1 }} />
          </Button>
          <Button
            variant="contained"
            sx={{ px: 3, py: 2, borderRadius: '12px' }}
          >
            Add to card
            <AddBoxOutlinedIcon fontSize="lmedium" sx={{ ml: 1 }} />
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProductCard;
