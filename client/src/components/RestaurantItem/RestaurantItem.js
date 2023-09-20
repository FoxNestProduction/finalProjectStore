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
import BookmarkIcon from '../SvgComponents/BookmarkIcon';
import StarIcon from '../SvgComponents/StarIcon';
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

const RestaurantItem = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 395 }}>

        <CardMedia
          component="img"
          height="177"
          image="./img/restaurants/Resturent01.jpg"
          alt="The Chicken King"
        />

        <CardHeader
          title="The Chicken King"
          // subheader="24min •"
        />

        <CardContent style={{ display: 'flex' }}>
          <Typography variant="body2" color="text.secondary">
            24min •
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <StarIcon />
            </IconButton>
          </CardActions>
          <Typography variant="body2" color="text.secondary">
            4.8
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <BookmarkIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RestaurantItem;
