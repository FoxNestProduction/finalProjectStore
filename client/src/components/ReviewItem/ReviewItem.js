import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { stylesCardReview, stylesQuoteIcon, stylesActionCard, stylesContent } from './styles';

const ReviewItem = ({ review }) => {
  const [isShow, setIsShow] = useState(false);
  const { rating, content, avatarUrl, userReview, date } = review;
  const ratingNumber = Number(rating);

  return (
    <Card sx={stylesCardReview}>
      {!isShow && (
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
        {content}
      </CardContent>
      <CardActions sx={stylesActionCard}>
        <Rating
          name="simple-controlled"
          value={ratingNumber}
          readOnly
        />
        <Typography>{date}</Typography>
      </CardActions>
    </Card>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object,
};
ReviewItem.defaultProps = {
  review: {},
};

export default ReviewItem;
