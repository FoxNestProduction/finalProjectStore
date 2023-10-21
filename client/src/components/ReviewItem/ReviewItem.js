import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box } from '@mui/material';

import { stylesCardReview, stylesQuoteIcon, stylesActionCard, stylesContent, stylesText, stylesFullText } from './styles';

const ReviewItem = ({ review }) => {
  const location = useLocation();
  const [isFullCard, setIsShow] = useState(false);
  const { rating, content, avatarUrl, userReview, date } = review;
  const isMoreThreeLineText = content.split('\n').length > 3;
  const isLessThreeLineText = content.split('\n').length > 1;
  const styleComment = (location.pathname === '/reviews') ? stylesFullText : { ...stylesText, whiteSpace: isLessThreeLineText && 'pre-line', lineClamp: isMoreThreeLineText && 3 };

  const minMidthWraper = !(location.pathname === '/reviews') && { tablet: '295px' };

  console.log(isMoreThreeLineText);
  const ratingNumber = Number(rating);
  const dateReview = new Date(+date);
  const day = String(dateReview.getDate()).padStart(2, '0');
  const month = String(dateReview.getMonth() + 1).padStart(2, '0');
  const year = dateReview.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <Card sx={{ ...stylesCardReview, minWidth: minMidthWraper }}>
      {!isFullCard && (
      <CardHeader
        avatar={(
          <Avatar>
            { avatarUrl || <PersonOutlineOutlinedIcon /> }
          </Avatar>
        )}
        title={
          userReview
        }
        action={
          <FormatQuoteRoundedIcon sx={stylesQuoteIcon} />
        }
      />
      )}
      <CardContent sx={stylesContent}>
        <Box sx={{ ...styleComment }}>
          {content}
        </Box>
      </CardContent>
      <CardActions sx={stylesActionCard}>
        <Rating
          name="simple-controlled"
          value={ratingNumber}
          readOnly
        />
        <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
      </CardActions>
    </Card>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object,
  // isFullCard: PropTypes.bool,
};
ReviewItem.defaultProps = {
  review: {},
  // isFullCard: false,
};

export default ReviewItem;
