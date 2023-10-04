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
  const [value, setValue] = useState();
  const reviews = useSelector((state) => state.reviews.reviews);
  /* eslint-disable-next-line no-underscore-dangle */
  const reviewItem = reviews.find((item) => item._id === _id);
  console.log(reviews);
  console.log(reviewItem);

  const reveiw = {
    _id: '650872a97c6b8f8dc9ab38d3',
    user_id: '650762989d951058716e2f85',
    rating: 4,
    comment: 'I am very satisfied with this product. Everything works excellentlyI am very satisfied with this product.',
  };

  const user = {
    _id: '650762989d951058716e2f85',
    firstName: 'Ihor',
    lastName: 'Kacher',
    avatarUrl: '',
  };
  const { id, firstName, lastName, avatarUrl } = user;
  const { rating, comment } = reveiw;

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
            value={rating}
            readOnly
          />
        </CardActions>
      </Card>
    </Container>
  );
};

ReviewItem.propTypes = {
  _id: PropTypes.string,
};

ReviewItem.defaultProps = {
  _id: '650872a97c6b8f8dc9ab38d3',
};

export default ReviewItem;
