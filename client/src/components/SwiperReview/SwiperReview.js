import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container, Box } from '@mui/material';
import styles from './SwiperReview.module.scss';
import ReviewItem from '../ReviewItem/ReviewItem';
import { searchReview } from '../../redux/slices/reviewsSlice';
import { scrollingWrapperStyles, cardStyles, scrollbarStyles, scrollbarTrackStyles, scrollbarThumbStyles } from './styles';

const SwiperReview = () => {
  const [isFullCard, setIsFullCard] = useState(true);
  const isMobile = useMediaQuery('(max-width: 491px)');
  const isTablet = useMediaQuery('(min-width: 491px) and (max-width: 691px)');
  const isLgTablet = useMediaQuery('(min-width: 691px)');
  const navigate = useNavigate();

  const reviews = useSelector((state) => state.reviews.reviews);
  const sortedReviews = reviews ? [...reviews].sort((a, b) => b.date - a.date) : null;
  const dispatch = useDispatch();
  const handleReviewClick = (item) => {
    navigate('/reviews');
    // eslint-disable-next-line no-underscore-dangle
    dispatch(searchReview(item._id));
  };

  const scrollingWrapperRef = useRef(null);
  const cardRef = useRef([]);

  useEffect(() => {
    const scrollingWrapper = scrollingWrapperRef.current;
    // console.log(cardRef);
    const scrollingWrapperRect = scrollingWrapper.getBoundingClientRect();
    const cardsRect = cardRef.current.map((item) => item.getBoundingClientRect());
    // console.log(scrollingWrapperRect);
    // console.log(cardsRect);
    cardsRect.forEach((item) => {
      if (scrollingWrapperRect.x === item.x) {
        setIsFullCard(false);
      }
      // console.log(isFullCard);
    });
    // if (scrollingWrapper && cards.length > 0) {
    //   const scrollingWrapperRect = scrollingWrapper.getBoundingClientRect();
    //   const cardRect = cards[0].getBoundingClientRect();

    //   if (scrollingWrapperRect.left === cardRect.left) {
    //     setIsFullCard(true);
    //   }
    // }
  }, [scrollingWrapperRef, isFullCard, cardRef]);

  return (
    <Container>
      <Box sx={{ pb: '150px' }}>
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
          {sortedReviews.slice(0, 9).map((item, index) => (
            <Box
            // eslint-disable-next-line no-underscore-dangle
              key={item._id}
              // eslint-disable-next-line no-underscore-dangle
              data={item._id}
              // eslint-disable-next-line
              ref={function (el) { cardRef.current[index] = el; }}
              // ref={cardRef[index]}
              className={styles.card}
              isFullCard={isFullCard}
              // sx={cardStyles}
              onClick={() => handleReviewClick(item)}
            >
              <ReviewItem review={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default SwiperReview;
