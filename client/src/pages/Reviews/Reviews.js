/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Box, Container, useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { instance } from '../../API/instance';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import NewReview from '../../components/NewReview/NewReview';
import { openModal, setTitle, setContent, setButtonAgree, addButtonBox, closeModal } from '../../redux/slices/modalSlice';
import { addNewReview, resetReviewState, searchReviews, setNewReview } from '../../redux/slices/reviewsSlice';
import { TitleBtn, commentItem, commentList, container, flexCenter, titleContainer } from './styles';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    const getReviews = async () => {
      try {
        const { data } = await instance.get('/comments');
        setReviews(data);// eslint-disable-line no-use-before-define
        setIsLoading(true);
        setIsRendered(true);
        console.log(data);
      } catch (error) {
        console.log('%cError loading reviews:', 'color: red; font-weight: bold;', error);
      }
    };
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedReviews = reviews
    ? [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date))
    : null;

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
    sortedReviews.forEach((item, index) => {
      cardRef.current[index] = containerRef.current.children[index];
    });
    if (searchReview && cardRef.current.length > 0) {
      const element = containerRef.current.querySelector(`[data="${searchReview}"]`);
      console.log(element);
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
      {isLoading ? (
        <Box ref={containerRef} sx={commentList}>
          {sortedReviews.map((item, index) => (
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
      ) : (
        <div>Loading...</div> // тут має бути скелетон?
      )}
    </Container>
  );
};

export default ReviewsPage;
