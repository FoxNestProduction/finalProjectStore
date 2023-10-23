import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Typography, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from './SwiperReview.module.scss';
import ReviewItem from '../ReviewItem/ReviewItem';
import { scrollingWrapperStyles, cardStyles, scrollbarStyles, scrollbarTrackStyles, scrollbarThumbStyles } from './styles';

const SwiperReview = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const reviews = useSelector((state) => state.reviews.reviews);
  const sortedReviews = reviews ? [...reviews].sort((a, b) => b.date - a.date).slice(0, 10) : null;

  const scrollingWrapperRef = useRef(null);
  const cardRef = useRef([]);

  const scrollToNextReview = (index) => {
    if (scrollingWrapperRef.current) {
      const slideWidth = cardRef.current[index].offsetWidth;
      scrollingWrapperRef.current.scrollLeft = 1 * index * slideWidth;
    }
  };

  const handleNextClick = () => {
    if (currentIndex < sortedReviews.length) {
      setCurrentIndex(currentIndex + 1);
      scrollToNextReview(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToNextReview(currentIndex - 1);
    }
  };

  return (
    <Container component="section">
      <Typography variant="h2" component="h2" color="text.primary" sx={{ textAlign: 'center', mb: 2 }}>Customer Say</Typography>
      <Box sx={{ pb: '150px', position: 'relative' }}>
        <Box
          // sx={{
          //   ...scrollingWrapperStyles,
          //   '&::-webkit-scrollbar': scrollbarStyles,
          //   '&::-webkit-scrollbar-track': scrollbarTrackStyles,
          //   '&::-webkit-scrollbar-thumb': scrollbarThumbStyles,
          // }}
          className={styles.scrollingWrapper}
          ref={scrollingWrapperRef}
        >
          {sortedReviews.map((item, index) => (
            <Box
            // eslint-disable-next-line no-underscore-dangle
              key={item._id}
              // eslint-disable-next-line no-underscore-dangle
              data={item._id}
              // eslint-disable-next-line
              ref={function (el) { cardRef.current[index] = el; }}
              className={styles.card}
              // sx={cardStyles}
            >
              <ReviewItem review={item} />
            </Box>
          ))}
        </Box>
        <IconButton
          aria-label="prev"
          sx={{ position: 'absolute', bottom: '33%', left: '30px', backgroundColor: 'background.quote' }}
          disabled={currentIndex === 0}
          onClick={handlePrevClick}
        >
          <NavigateBeforeIcon fontSize="large" sx={{ color: 'primary.main' }} />
        </IconButton>
        <IconButton
          aria-label="next"
          sx={{ position: 'absolute', bottom: '33%', right: '30px', backgroundColor: 'background.quote' }}
          disabled={currentIndex === sortedReviews.length - 1}
          onClick={handleNextClick}
        >
          <NavigateNextIcon fontSize="large" sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
    </Container>
  );
};

export default SwiperReview;
