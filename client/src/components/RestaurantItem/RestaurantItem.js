import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import styles from './RestaurantItem.module.scss';
import BookmarkIcon from '../SvgComponents/BookmarkIcon';
import RatingItem from './Rating';
import ColorChips from './Chip';

const RestaurantItem = ({ restaurantRankingValue }) => {
  return (
    <Card className={styles.Card}>

      <CardMedia
        component="img"
        height="177"
        image="./img/restaurants/Resturent01.jpg"
        alt="The Chicken King"
      />
      <ColorChips />
      <CardHeader
        title="The Chicken King"
        className={styles.Card__header}
      />
      <Box
        className={styles.Card__box}
      >
        <CardContent
          // style={{ padding: '0', height: '50px' }}
          className={styles.Card__content}
        >
          <Typography variant="body2" color="text.secondary" className={styles.Card__text}>
            24min •
          </Typography>

          <RatingItem defaultValue={restaurantRankingValue} />

        </CardContent>
        <CardActions className={styles.Card__actions} disableSpacing>
          <IconButton aria-label="add to favorites">
            <BookmarkIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

RestaurantItem.propTypes = {
  restaurantRankingValue: PropTypes.number,
};

RestaurantItem.defaultProps = {
  restaurantRankingValue: null,
};

export default RestaurantItem;
