import React, { memo, useEffect, useRef, useState } from 'react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from './SwiperReview.module.scss';
import ReviewItem from '../ReviewItem/ReviewItem';
import useGetAPI from '../../customHooks/useGetAPI';
import Skeleton from '../Skeleton/Skeleton';

const SwiperReview = () => {
  const [lastReviewsData, loading] = useGetAPI('/comments/filter?startPage=1&perPage=8&sort=-date');
  const [currentIndex, setCurrentIndex] = useState(1);
  const [widthStep, setWidthStep] = useState(0);
  const lengthReviews = lastReviewsData && lastReviewsData.comments.length - 1;
  const { i18n, t } = useTranslation();

  const scrollingWrapperRef = useRef(null);
  const cardRef = useRef([]);

  useEffect(() => {
    if (lastReviewsData?.comments) {
      cardRef.current = lastReviewsData.comments
        .map((item, index) => scrollingWrapperRef.current.children[index]);
      const step = cardRef.current[0].offsetWidth;
      setWidthStep(step);
    }
  }, [lastReviewsData?.comments]);

  const scrollStep = scrollingWrapperRef.current ? widthStep : 0;

  const handleNextClick = () => {
    if (scrollingWrapperRef.current && currentIndex < (lastReviewsData.comments.length - 1)) {
      scrollingWrapperRef.current.scrollLeft += scrollStep;
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === lastReviewsData.comments.length - 1) {
      scrollingWrapperRef.current.scrollLeft = scrollStep * currentIndex;
    }
  };

  const handlePrevClick = () => {
    if (scrollingWrapperRef.current && currentIndex > 0) {
      scrollingWrapperRef.current.scrollLeft -= scrollStep;
      setCurrentIndex(currentIndex - 1);
    }
    if (currentIndex === 1 || currentIndex === 0) {
      scrollingWrapperRef.current.scrollLeft = 0;
    }
  };

  useEffect(() => {
    const scrollingWrapper = scrollingWrapperRef.current;

    const handleScroll = () => {
      const { scrollLeft } = scrollingWrapper;
      const newIndex = Math.floor(scrollLeft / scrollStep);
      setCurrentIndex(newIndex);
    };
    scrollingWrapper.addEventListener('scroll', handleScroll);
    return () => {
      scrollingWrapper.removeEventListener('scroll', handleScroll);
    };
  }, [scrollStep]);

  return (
    <Container component="section">
      <Typography variant="h2" component="h2" color="text.primary" sx={{ textAlign: 'center', mb: 2 }}>{t('homePage.сustomerSay')}</Typography>
      <Box sx={{ pb: '150px', position: 'relative' }}>

        <Box
          className={styles.scrollingWrapper}
          ref={scrollingWrapperRef}
        >
          {loading ? (
            <>
              <Box className={styles.card}>
                <Skeleton />
              </Box>
              <Box className={styles.card}>
                <Skeleton />
              </Box>
              <Box className={styles.card}>
                <Skeleton />
              </Box>
              <Box className={styles.card}>
                <Skeleton />
              </Box>
            </>
          ) : lastReviewsData && lastReviewsData?.comments.map((item, index) => (
            item.customer && (
              <Box
            // eslint-disable-next-line no-underscore-dangle
                key={item._id}
              // eslint-disable-next-line no-underscore-dangle
                data={item._id}
              // eslint-disable-next-line
              className={styles.card}
                ref={cardRef}
              >
                <ReviewItem review={item} index={index} />
              </Box>
            )))}
          <Box sx={{ display: { mobile: 'none', lgTablet: 'block' } }}>
            <IconButton
              aria-label="prev"
              sx={{ position: 'absolute', bottom: '25%', left: '30px', backgroundColor: 'background.quote' }}
              disabled={currentIndex < 0}
              onClick={handlePrevClick}
            >
              <NavigateBeforeIcon fontSize="large" sx={{ color: 'primary.main' }} />
            </IconButton>
            <IconButton
              aria-label="next"
              sx={{ position: 'absolute', bottom: '25%', right: '30px', backgroundColor: 'background.quote' }}
              disabled={(currentIndex >= lengthReviews)}
              onClick={handleNextClick}
            >
              <NavigateNextIcon fontSize="large" sx={{ color: 'primary.main' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(SwiperReview);
