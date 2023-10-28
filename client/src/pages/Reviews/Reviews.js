/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Box, Container, useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useGetAPI from '../../customHooks/useGetAPI';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import NewReview from '../../components/NewReview/NewReview';
import { openModal, setTitle, setContent, setButtonAgree, addButtonBox, closeModal } from '../../redux/slices/modalSlice';
import { addNewReview, resetReviewState, searchReviews } from '../../redux/slices/reviewsSlice';
import { TitleBtn, commentItem, commentList, container, flexCenter, titleContainer } from './styles';

const ReviewsPage = () => {
  const [lastReviewsData, loading, error] = useGetAPI('/comments/filter?startPage=1&perPage=9&sort=-date');
  const [reviews, setReviews] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const dispatch = useDispatch();
  const newReview = useSelector((state) => state.reviews.newReview);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const searchReview = useSelector((state) => state.reviews.search);
  const isLgTablet = useMediaQuery('(min-width: 690px)');

  const containerRef = useRef(null);
  const cardRef = useRef([]);

  useEffect(() => {
    if (lastReviewsData?.comments) {
      cardRef.current = lastReviewsData.comments.map(() => createRef());
    }
    setReviews(lastReviewsData?.comments);// eslint-disable-line no-use-before-define
    setIsRendered(true);
    console.log(error);
  }, [lastReviewsData?.comments, error]);

  const handleSendFeedback = () => {
    dispatch(addNewReview());
    dispatch(resetReviewState());
    dispatch(closeModal());
  };

  useEffect(() => {
    setReviews([newReview, ...reviews]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReview.customer]);

  useEffect(() => {
    if (newReview.content && newReview.content !== '') {
      dispatch(setButtonAgree({
        text: 'Send',
        endIcon: true,
        disabled: false,
        onClick: handleSendFeedback,
      }));
    } else {
      dispatch(resetReviewState());
      dispatch(setButtonAgree({
        text: 'Send',
        endIcon: true,
        disabled: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReview]);

  const handleOpenModalReview = () => {
    if (isRendered) {
      dispatch(openModal());
      dispatch(setTitle('Feedback about the service will help us work even better:'));
      dispatch(setContent(
        <NewReview />,
      ));
      dispatch(resetReviewState());
      dispatch(setButtonAgree({
        text: 'Send',
        endIcon: true,
        disabled: newReview.content === '',
      }));
      dispatch(addButtonBox(true));
    }
  };

  useEffect(() => {
    if (searchReview && cardRef.current.length > 0) {
      const element = containerRef.current.querySelector(`[data="${searchReview}"]`);
      const scrollScreen = () => {
        if (element && !isScrolling.current) {
          const elementPosition = element.getBoundingClientRect().top;
          window.scrollTo({
            top: window.scrollY + elementPosition - 110,
            behavior: 'smooth',
          });
        }
      };
      scrollScreen();
      setIsScrolling(true);
    }
    if (isScrolling) {
      dispatch(searchReviews(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRendered, searchReview, cardRef.current.length]);

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
      <Box ref={containerRef} sx={commentList}>
        {lastReviewsData && reviews.map((item, index) => (
          <Box
            key={item._id}
            data={item._id}
            // eslint-disable-next-line
            ref={cardRef.current[index]}
            sx={commentItem}
          >
            <ReviewItem review={item} />
          </Box>
        ))}
      </Box>
      {loading && <div>Loading...</div>}
      {error && <div>{error.statusText}</div>}
    </Container>
  );
};

export default ReviewsPage;
