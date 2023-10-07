import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Stack } from '@mui/material';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Modal from '../../components/Modal/Modal';

const ReviewsPage = () => {
  const reviews = useSelector((state) => state.reviews.reviews);
  /* eslint-disable-next-line no-underscore-dangle */
  // const reviewItem = reviews.find((item) => item._id === _id);
  // console.log(reviews);
  // console.log(reviewItem);
  return (
    <>
      <Typography variant="h2">Customer Say</Typography>
      <Stack>
        {reviews.map((item) => <ReviewItem key={item.comment} review={item} />)}
      </Stack>
      <ReviewItem />
      <Modal />
    </>
  );
};

export default ReviewsPage;
