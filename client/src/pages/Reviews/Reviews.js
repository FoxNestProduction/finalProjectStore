/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Stack, Button, Box, Container, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Modal from '../../components/Modal/Modal';
import NewReview from '../../components/NewReview/NewReview';
import { openModal, setTitle, setContent, setButtonAgree, addButtonBox, closeModal } from '../../redux/slices/modalSlice';
import { addNewReview, setNewReview } from '../../redux/slices/reviewsSlice';
import { TitleBtn, commentItem, commentList, container, flexCenter, titleContainer, useStyles } from './styles';

const ReviewsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const newReview = useSelector((state) => state.reviews.newReview);
  const isLgTablet = useMediaQuery('(min-width: 690px)');

  const handleSendFeedback = () => {
    dispatch(addNewReview());
    dispatch(closeModal());
    dispatch(setNewReview({ field: 'user_id', value: '' }));
    dispatch(setNewReview({ field: 'rating', value: null }));
    dispatch(setNewReview({ field: 'avatarUrl', value: '' }));
    dispatch(setNewReview({ field: 'content', value: '' }));
    dispatch(setNewReview({ field: 'userReview', value: '' }));
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

  const incrementIndex = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(incrementIndex, 400);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container component="section" sx={{ ...flexCenter, ...container }}>
      <Box sx={titleContainer}>
        <Typography variant="h2" sx={{ justifySelf: 'center' }}>Customer Say</Typography>
        <Button variant="standard" sx={TitleBtn} onClick={handleOpenModalReview}>
          {isLgTablet && <Typography mr={1}>Create your oun review</Typography>}
          <AddCircleOutlineIcon />
        </Button>
      </Box>
      <Box sx={{ ...commentList, ...useStyles }}>
        {reviews.slice(0, currentIndex).map((item) => (
          <Box sx={commentItem}>
            <ReviewItem key={item._id} review={item} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ReviewsPage;
