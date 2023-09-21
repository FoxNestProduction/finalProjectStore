import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { PropTypes } from 'prop-types';
import styles from './RestaurantItem.module.scss';
import BookmarkIcon from '../SvgComponents/BookmarkIcon';
import StarIcon from '../SvgComponents/StarIcon';
import RatingItem from './Rating';

// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// {/* sx={{ maxWidth: 395, display: 'flex', flexWrap: 'wrap' }}  */}

const RestaurantItem = ({ restaurantRankingValue }) => {
  return (
    <Card className={styles.wrapper}>

      <CardMedia
        component="img"
        height="177"
        image="./img/restaurants/Resturent01.jpg"
        alt="The Chicken King"
      />
      <Box
        style={{
          display: 'flex', flexWrap: 'wrap', alignItem: 'center', width: '100%',
        }}
      >
        <CardHeader
          style={{ width: '100%' }}
          title="The Chicken King"
          // subheader="24min •"
        />
      </Box>
      <Box
        style={{
          display: 'flex', width: '100%',
        }}
      >
        <CardContent
          style={{
            display: 'flex', width: '50%', padding: '0', paddingLeft: '16px',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            24min •
          </Typography>

          {/* <IconButton aria-label="add to favorites">
            <StarIcon />
          </IconButton> */}

          {/* <Typography variant="body2" color="text.secondary">
            4.8
          </Typography> */}

          <RatingItem defaultValue={restaurantRankingValue} />

        </CardContent>
        <CardActions disableSpacing style={{ marginLeft: '170px' }}>
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
