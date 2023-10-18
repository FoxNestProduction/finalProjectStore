import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

const SwiperReview = () => {
  const isMobile = useMediaQuery('(max-width: 491px)');
  const isTablet = useMediaQuery('(min-width: 491px) and (max-width: 691px)');
  const isLgTablet = useMediaQuery('(min-width: 691px)');
  const navigate = useNavigate();

  const reviews = useSelector((state) => state.reviews.reviews);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isScrollbarActive, setIsScrollbarActive] = useState(false);
  console.log(isScrollbarActive);
  const handleReviewClick = () => {
    navigate('/reviews');
  };

  return (
    <Container>
      <Box sx={{ mr: { mobile: '0px', tablet: '-65px', desctop: '-90px' }, pt: '82px', pb: '150px', position: 'relative', display: 'flex', gap: 3, flexDirection: 'row' }}>
        {isMobile || isTablet || (
          <Box sx={{ width: '37%', height: '100%' }}>
            {reviews.slice(0, 1).map((item) => (
              <ReviewItem review={item} />
            ))}
          </Box>
        )}
        <Swiper
          className={styles.wrapper}
          modules={[Scrollbar]}
          spaceBetween="20px"
          grabCursor="true"
          // slidesPerView={1.7}
          breakpoints={{
            isMobile: { slidesPerView: 1 },
            491: { slidesPerView: 0.2 },
            991: { slidesPerView: 1.7 },
          }}
          scrollbar={{
            draggable: true,
            dragSize: '80px',
            // el: '.swiperScrollbarDrag',
            allowTouchMove: true,
          }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={() => console.log('slide change')}
          onScrollbarDragStart={() => setIsScrollbarActive(true)}
          onScrollbarDragEnd={() => setIsScrollbarActive(false)}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.index} onClick={() => handleReviewClick(item)}>
              <div><ReviewItem review={item} /></div>
            </SwiperSlide>
          ))}
          <div className={styles.swiperScrollbar}>
            <div
              className={classNames(styles.swiperScrollbarDrag, {
                [styles.active]: isScrollbarActive,
              })}
              onMouseEnter={() => setIsScrollbarActive(true)}
              onMouseLeave={() => setIsScrollbarActive(false)}
            />
          </div>
        </Swiper>
      </Box>
    </Container>
  );
};

export default SwiperReview;
