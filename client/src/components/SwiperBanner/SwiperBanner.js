import React, { memo, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import classNames from 'classnames';

import 'swiper/scss';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import styles from './SwiperBanner.module.scss';

const SwiperBanner = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const data = [
    { url: './img/Banner.jpg', index: 0 },
    { url: './img/Banner2_1.jpg', index: 1 },
    { url: './img/Banner3_1.jpg', index: 2 },
  ];

  const handleSlideChange = useCallback((swiper) => {
    setActiveSlideIndex(swiper.realIndex);
  }, []);

  const handlePaginationClick = useCallback((index) => {
    setActiveSlideIndex(index);
    swiperInstance.slideToLoop(index);
  }, [swiperInstance]);

  return (
    <>
      <Swiper
        className={styles.wrap}
        effect="cube"
        grabCursor
        cubeEffect={{
          shadow: false,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        loop
        modules={[Autoplay, EffectCube, Pagination]}
        pagination={{ clickable: true, el: '.customPaginationItem' }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={handleSlideChange}
        speed={700}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {data.map((item) => (
          <SwiperSlide className={styles.swiperSlide} key={item.index}>
            <div id={item.index} className={styles.swiperSlideItem}>
              <img src={item.url} alt={`Slide${item.index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.customPagination}>
        {data.map((item) => (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            id={item.index}
            key={item.index}
            className={classNames(styles.customPaginationItem, {
              [styles.active]: item.index === activeSlideIndex,
            })}
            onClick={() => handlePaginationClick(item.index)}
          />
        ))}
      </div>
    </>
  );
};

export default memo(SwiperBanner);
