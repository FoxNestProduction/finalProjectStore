import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from './SwiperReview.module.scss';
import ReviewItem from '../ReviewItem/ReviewItem';
import { scrollingWrapperStyles, cardStyles, scrollbarStyles, scrollbarTrackStyles, scrollbarThumbStyles } from './styles';
import { instance } from '../../API/instance';
import useGetAPI from '../../customHooks/useGetAPI';

const SwiperReview = () => {
  const [lastReviewsData, loading, error] = useGetAPI('/comments/filter?startPage=1&perPage=9&sort=-date');
  const [currentIndex, setCurrentIndex] = useState(1);
  const [widthStep, setWidthStep] = useState(0);
  const reviews = useSelector((state) => state.reviews.reviews);
  const sortedReviews = reviews
    ? [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date))
    : null;

  const scrollingWrapperRef = useRef(null);
  const cardRef = useRef([]);

  useEffect(() => {
    sortedReviews.forEach((item, index) => {
      cardRef.current[index] = scrollingWrapperRef.current.children[index];
      const step = cardRef.current[0].offsetWidth;
      setWidthStep(step);
    });
  }, [sortedReviews]);

  const scrollStep = scrollingWrapperRef.current ? widthStep : 0;

  const handleNextClick = () => {
    if (scrollingWrapperRef.current && currentIndex < sortedReviews.length) {
      setCurrentIndex(currentIndex + 1);
      scrollingWrapperRef.current.scrollLeft += scrollStep;
    }
  };

  const handlePrevClick = () => {
    if (scrollingWrapperRef.current && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollingWrapperRef.current.scrollLeft -= scrollStep;
    }
  };

  return (
    <Container component="section">
      <Typography variant="h2" component="h2" color="text.primary" sx={{ textAlign: 'center', mb: 2 }}>Customer Say</Typography>
      <Box sx={{ pb: '150px', position: 'relative' }}>
        <Box
          className={styles.scrollingWrapper}
          ref={scrollingWrapperRef}
        >
          {/* todo: render skeleton here! */}
          {/* {loading && <p>Loading...</p>} */}
          {lastReviewsData && lastReviewsData?.comments.map((item, index) => (
            <Box
            // eslint-disable-next-line no-underscore-dangle
              key={item._id}
              // eslint-disable-next-line no-underscore-dangle
              data={item._id}
              // eslint-disable-next-line
              className={styles.card}
            >
              <ReviewItem review={item} ref={cardRef.current[index]} />
            </Box>
          ))}
          <IconButton
            aria-label="prev"
            sx={{ position: 'absolute', bottom: '23%', left: '30px', backgroundColor: 'background.quote' }}
            disabled={currentIndex === 0}
            onClick={handlePrevClick}
          >
            <NavigateBeforeIcon fontSize="large" sx={{ color: 'primary.main' }} />
          </IconButton>
          <IconButton
            aria-label="next"
            sx={{ position: 'absolute', bottom: '23%', right: '30px', backgroundColor: 'background.quote' }}
            disabled={(currentIndex === sortedReviews.length - 1)}
            onClick={handleNextClick}
          >
            <NavigateNextIcon fontSize="large" sx={{ color: 'primary.main' }} />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default SwiperReview;
