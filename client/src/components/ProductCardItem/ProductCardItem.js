import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardContent from '@mui/material/CardContent';
import { PropTypes } from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles';
import styles from './ProductCardItem.module.scss';
import RatingItem from '../Rating/Rating';
import theme from '../../theme';


const ProductCardItem = ({ restaurantRankingValue }) => {
  const cardStyle = {
    borderRadius: '22px',
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 146, maxHeight: 225 }} style={cardStyle}>
        <Box className={styles.box}>
          <CardActions disableSpacing className={styles.addToFavourite}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
          <CardMedia
            className={styles.productCardImage}
            sx={{ height: 131 }}
            image="./img/salads/3.png"
            title="green iguana"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Chicken Hell
          </Typography>
          <Typography variant="body2" color="text.secondary">
            24min •
            <RatingItem defaultValue={restaurantRankingValue} />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

ProductCardItem.propTypes = {
  restaurantRankingValue: PropTypes.number,
};

ProductCardItem.defaultProps = {
  restaurantRankingValue: null,
};

export default ProductCardItem;
