import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import Features from '../../components/Features/Features';
import MobileApp from '../../components/MobileApp/MobileApp';
import SwiperReview from '../../components/SwiperReview/SwiperReview';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import { instance } from '../../API/instance';
import SwiperBanner from '../../components/SwiperBanner/SwiperBanner';
import Skeleton from '../../components/Skeleton/Skeleton';
import { gridStylesContainer } from '../../components/ListItems/styles';

const HomePage = () => {
  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);
  const loadingPartners = useSelector((state) => state.partners.loading);
  const topProducts = useSelector((state) => state.products.topProducts, shallowEqual);
  const loadingProducts = useSelector((state) => state.products.loading);

  return (
    <>
      <SectionGetStarted />
      <Features />
      <MobileApp />
      {loadingPartners ? (
        <Container sx={{ mb: 13 }}>
          <Box sx={gridStylesContainer}>
            <Skeleton skeletonType="restaurant" />
            <Skeleton skeletonType="restaurant" />
            <Skeleton skeletonType="restaurant" />
          </Box>
        </Container>
      ) : (topPartners.length > 0 && (
        <ListItems
          title="Our Top Restaurants"
          items={topPartners}
          itemComponent={RestaurantItem}
          actions={<ListItemAction type="partners" />}
          type="partners"
        />
      )) }
      {loadingProducts ? (
        <Container sx={{ mb: 13 }}>
          <Box sx={gridStylesContainer}>
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
            <Skeleton skeletonType="product" />
          </Box>
        </Container>
      ) : (topProducts.length > 0 && (
      <ListItems
        title="Our Top Dishes"
        items={topProducts}
        itemComponent={ProductCardItem}
        actions={<ListItemAction />}
      />
      )) }
      <SwiperReview />
    </>
  );
};

export default HomePage;
