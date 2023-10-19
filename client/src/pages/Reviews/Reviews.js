/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Stack, Button, Box, Container, useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Modal from '../../components/Modal/Modal';
import NewReview from '../../components/NewReview/NewReview';
import { openModal, setTitle, setContent, setButtonAgree, addButtonBox, closeModal } from '../../redux/slices/modalSlice';
import { addNewReview, setNewReview } from '../../redux/slices/reviewsSlice';
import { TitleBtn, commentItem, commentList, container, flexCenter, titleContainer } from './styles';

const ReviewsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRendered, setIsRendered] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const newReview = useSelector((state) => state.reviews.newReview);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const searchReview = useSelector((state) => state.reviews.search);
  const isLgTablet = useMediaQuery('(min-width: 690px)');

  const containerRef = useRef(null);

  const handleSendFeedback = () => {
    dispatch(addNewReview());
    dispatch(setNewReview({ field: 'user_id', value: '' }));
    dispatch(setNewReview({ field: 'rating', value: null }));
    dispatch(setNewReview({ field: 'avatarUrl', value: '' }));
    dispatch(setNewReview({ field: 'content', value: '' }));
    dispatch(setNewReview({ field: 'userReview', value: '' }));
    dispatch(closeModal());
  };

  if (newReview.content !== '') {
    dispatch(setButtonAgree({
      text: 'Send',
      endIcon: true,
      disabled: false,
      onClick: handleSendFeedback,
    }));
  } else {
    dispatch(setNewReview({ field: 'user_id', value: '' }));
    dispatch(setNewReview({ field: 'rating', value: null }));
    dispatch(setNewReview({ field: 'avatarUrl', value: '' }));
    dispatch(setNewReview({ field: 'content', value: '' }));
    dispatch(setNewReview({ field: 'userReview', value: '' }));
    dispatch(setButtonAgree({
      text: 'Send',
      endIcon: true,
      disabled: true,
    }));
  }

  const handleOpenModalReview = () => {
    dispatch(openModal());
    dispatch(setTitle('Feedback about the service will help us work even better:'));
    dispatch(setContent(
      <NewReview />,
    ));
    dispatch(setButtonAgree({
      text: 'Send',
      endIcon: true,
      disabled: newReview.content === '',
    }));
    dispatch(addButtonBox(true));
  };

  const incrementIndex = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(incrementIndex, 200);
    setIsRendered(true);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const scrollScreen = (id) => {
      if (containerRef.current) {
        const element = containerRef.current.querySelector(`[data="${id}"]`);
        if (element) {
          console.log(element);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    if (searchReview && isRendered) {
      scrollScreen(searchReview);
    }
  }, [searchReview, isRendered]);

  const sortedReviews = reviews ? [...reviews].sort((a, b) => b.date - a.date) : null;

  return (
    <Container component="section" sx={{ ...flexCenter, ...container }}>
      <Box sx={titleContainer}>
        <Typography variant="h2" sx={{ justifySelf: 'center' }}>Customers Say</Typography>
        {isUserAuthorized && (
          <Button variant="standard" sx={TitleBtn} onClick={handleOpenModalReview}>
            {isLgTablet && <Typography mr={1}>Create your own review</Typography>}
            <AddCircleOutlineIcon />
          </Button>
        )}

      </Box>
      <Box sx={commentList} ref={containerRef}>
        {sortedReviews.slice(0, currentIndex).map((item) => (
          <Box key={item._id} data={item._id} sx={commentItem}>
            <ReviewItem review={item} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ReviewsPage;
