import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const ProductCard = () => {
  return (
    <Container>
      <Card>
        <CardHeader
          // variant="h5"
          title="Name Dish"
          sx={{ pb: 3, pt: 5 }}
        />
        {/* /> */}
        <CardMedia
          component="img"
          //  height=""
          image="./img/seaFood/lobster.png"
          alt="lobster"
        />
        <CardContent>
          <Typography
            variant="description"
          >
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like
          </Typography>
          {/* <Grid>
          </Grid> */}
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            endIcon={<FavoriteBorderOutlinedIcon />}
          >
            Favourite
          </Button>
          <Button
            variant="contained"
            endIcon={<AddBoxOutlinedIcon />}
          >
            Add to card
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProductCard;
