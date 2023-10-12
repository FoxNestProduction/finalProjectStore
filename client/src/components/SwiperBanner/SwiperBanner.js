import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination } from 'swiper/modules';
import classNames from 'classnames';

import 'swiper/scss';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import styles from './SwiperBanner.module.scss';

const SwiperBanner = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  console.log(swiperInstance);

  useEffect(() => {
    const updateActiveSlide = () => {
      if (swiperInstance) {
        const currentIndex = swiperInstance.activeIndex;
        const slidesLength = swiperInstance.slides.length;
        const nextIndex = (currentIndex + 1) % slidesLength;
        setActiveSlideIndex(nextIndex);
        swiperInstance.slideToLoop(nextIndex);
        // const newIndex = (currentIndex + 1);
        // if (newIndex === slidesLength) {
        //   setActiveSlideIndex(0);
        //   swiperInstance.slideToLoop(0);
        // } else {
        //   const nextIndex = (currentIndex + 1);
        //   setActiveSlideIndex(nextIndex);
        //   swiperInstance.slideToLoop(nextIndex);
        // }
      }
    };

    const interval = setInterval(updateActiveSlide, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [swiperInstance]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (swiperInstance) {
  //       setActiveSlideIndex(0);
  //       swiperInstance.slideTo(0);
  //     }
  //   }, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [swiperInstance]);

  const handleBulletClick = (index) => {
    console.log(index);
    setActiveSlideIndex(index);
    swiperInstance.slideTo(index);
  };

  const paginationData = [
    { index: 0 },
    { index: 1 },
    { index: 2 },
  ];

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
        modules={[EffectCube, Pagination]}
        pagination={{ clickable: true, el: '.customPaginationItem' }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => {
          setActiveSlideIndex(swiper.activeIndex);
        }}
        speed={700}
        rewind
        loop
        loopAdditionalSlides={2}
        // onReachEnd={(swiper) => {
        //   setActiveSlideIndex(swiper.activeIndex);
        //   if (swiper.activeIndex === swiper.slides.length - 1) {
        //     swiper.slideTo(0);
        //   }
        // }}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <div className={styles.swiperSlideItem}>
            <img src="./img/Banner.jpg" alt="Slide 1" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className={styles.swiperSlideItem}>
            <img src="./img/Banner2.jpg" alt="Slide 2" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div className={styles.swiperSlideItem}>
            <img src="./img/Banner3.jpg" alt="Slide 3" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className={styles.customPagination}>
        {paginationData.map((item) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <div
            key={item.index}
            className={
              classNames(
                styles.customPaginationItem,
                { [styles.active]: item.index === activeSlideIndex },
              )
            }
            onClick={() => handleBulletClick(item.index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleBulletClick(item.index);
              }
            }}
            role="button"
            tabIndex={0}
          />
        ))}
      </div>
    </>
  );
};

export default SwiperBanner;
