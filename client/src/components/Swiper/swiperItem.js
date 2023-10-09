import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

// import './.App/scss';

import styles from './Swiper.module.scss';
// import required modules

const SwiperItem = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  useEffect(() => {
    // Функція для оновлення активного слайду
    const updateActiveSlide = () => {
      if (swiperInstance) {
        console.log(swiperInstance);
        const currentIndex = swiperInstance.activeIndex;
        console.log(currentIndex);
        const slidesLength = swiperInstance.slides.length;
        const nextIndex = (currentIndex + 1) % slidesLength;
        console.log(nextIndex);
        swiperInstance.slideTo(nextIndex);
      }
    };

    // Встановлюємо інтервал для автоматичної зміни слайдів
    // const interval = setInterval(updateActiveSlide, 3000);

    // При зміні активного слайду, очищаємо інтервал
    return () => {
      // clearInterval(interval);
    };
  }, [swiperInstance]);

  return (
    <Swiper
      className={styles.wrap}
      effect="cube"
      grabCursor
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      modules={[EffectCube, Pagination]}
      // className="mySwiper"
      onSwiper={(swiper) => setSwiperInstance(swiper)}
      pagination={{ clickable: true, el: '.custom-pagination' }}
    >
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="Slide 4" />
      </SwiperSlide>

      <div className={styles.customPagination}>
        <div className={styles.customPaginationItem}>1</div>
        <div className="custom-pagination-item">2</div>
        <div className="custom-pagination-item">3</div>
        <div className="custom-pagination-item">4</div>
      </div>
    </Swiper>
  );
};

export default SwiperItem;
