import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Stack, Button } from '@mui/material';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Modal from '../../components/Modal/Modal';
import NewReview from '../../components/NewReview/NewReview';
import { openModal, setTitle, setContent, setButtonAgree, addButtonBox, closeModal } from '../../redux/slices/modalSlice';
import { addNewReview, setNewReview } from '../../redux/slices/reviewsSlice';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const newReview = useSelector((state) => state.reviews.newReviews);
  const token = useSelector((state) => state.authorization.token);

  const handleSendFeedback = () => {
    if (newReview.content === '') {
      dispatch(closeModal());
      return;
    }
    dispatch(addNewReview());
    dispatch(closeModal());
    dispatch(setNewReview({ field: 'rating', value: null }));
  };

  const handleOpenModalReview = () => {
    dispatch(openModal());
    dispatch(setTitle('Feedback about the service will help us work even better:'));
    dispatch(setContent(
      <NewReview />,
    ));
    dispatch(setButtonAgree({
      text: 'Send',
      endIcon: true,
      onClick: handleSendFeedback,
    }));
    dispatch(addButtonBox(true));
  };

  return (
    <>
      <Button variant="standard" onClick={handleOpenModalReview}>
        Open modal with review
      </Button>
      <Typography variant="h2">Customer Say</Typography>
      <Stack>
        {/* eslint-disable-next-line no-underscore-dangle */}
        {reviews.map((item) => <ReviewItem key={item.comment} review={item} />)}
      </Stack>
      <Modal />
    </>
  );
};

export default ReviewsPage;
