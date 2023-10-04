import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Container } from '@mui/material';

import { stylesCardReview, stylesQuoteIcon, stylesActionCard, stylesContent } from './styles';

const ReviewItem = ({ _id }) => {
  const [isShow, setIsShow] = useState(false);
  const reviews = useSelector((state) => state.reviews.reviews);
  /* eslint-disable-next-line no-underscore-dangle */
  const reviewItem = reviews.find((item) => item._id === _id);
  // console.log(reviews);
  // console.log(reviewItem);

  const user = {
    _id: '650762989d951058716e2f85',
    firstName: 'Ihor',
    lastName: 'Kacher',
    avatarUrl: '',
  };
  const { id, firstName, lastName, avatarUrl } = user;
  const { rating, comment } = reviewItem;
  const ratingNumber = Number(rating);

  return (
    <Container>
      <Card sx={stylesCardReview}>
        {!isShow && (
        <CardHeader
          avatar={(
            <Avatar>
              { avatarUrl || <PersonOutlineOutlinedIcon /> }
            </Avatar>
          )}
          title={
            `${lastName} ${firstName}`
          }
          action={
            <FormatQuoteRoundedIcon sx={stylesQuoteIcon} />
          }
        />
        )}
        <CardContent sx={stylesContent}>
          {comment}
        </CardContent>
        <CardActions sx={stylesActionCard}>
          <Rating
            name="simple-controlled"
            value={ratingNumber}
            readOnly
          />
        </CardActions>
      </Card>
    </Container>
  );
};

ReviewItem.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ReviewItem.defaultProps = {
  _id: '651dce27e5fb5c72c69f0abc',
};

export default ReviewItem;
