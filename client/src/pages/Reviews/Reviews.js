import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Stack } from '@mui/material';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Modal from '../../components/Modal/Modal';

const ReviewsPage = () => {
  const reviews = useSelector((state) => state.reviews.reviews);
  console.log(reviews);

  return (
    <>
      <Typography variant="h2">Customer Say</Typography>
      <Stack>
        {reviews.map((item) => <ReviewItem key={item.comment} review={item} />)}
      </Stack>
      <Modal />
    </>
  );
};

export default ReviewsPage;
