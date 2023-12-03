import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import Features from '../../components/Features/Features';
import MobileApp from '../../components/MobileApp/MobileApp';
import SwiperReview from '../../components/SwiperReview/SwiperReview';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import Skeleton from '../../components/Skeleton/Skeleton';
import { partnersSkeletonStylesContainer, productSkeletonStylesContainer } from './styles';
import useTopProducts from '../../customHooks/useTopProducts';
import useTopPartners from '../../customHooks/useTopPartners';

const HomePage = () => {
  const topPartners = useTopPartners();
  const loadingPartners = useSelector((state) => state.partners.loading);
  const { i18n, t } = useTranslation();

  const topProducts = useTopProducts();
  const loadingProducts = useSelector((state) => state.products.loading);

  const isLgTablet = useMediaQuery('(min-width: 690px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');

  return (
    <>
      <SectionGetStarted />
      <Features />
      <MobileApp />
      {loadingPartners ? (
        <Container sx={{ mb: 13 }}>
          <Typography
            variant="h2"
            component="h2"
            color="text.primary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            {t('homePage.ourTopRestaurants')}
          </Typography>
          <Box sx={partnersSkeletonStylesContainer}>
            <Skeleton skeletonType="restaurant" />
            <Skeleton skeletonType="restaurant" />
            {!isLgTablet || isDesktop ? <Skeleton skeletonType="restaurant" /> : null}
          </Box>
        </Container>
      ) : (topPartners.length > 0 && (
        <ListItems
          title={t('homePage.ourTopRestaurants')}
          items={topPartners}
          itemComponent={RestaurantItem}
          actions={<ListItemAction type="partners" />}
          type="partners"
        />
      ))}

      {loadingProducts ? (
        <Container sx={{ mb: 13 }}>
          <Typography
            variant="h2"
            component="h2"
            color="text.primary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            {t('homePage.ourTopDishes')}
          </Typography>
          <Grid sx={productSkeletonStylesContainer}>
            <Grid>
              <Skeleton skeletonType="product" />
            </Grid>
            <Grid>
              <Skeleton skeletonType="product" />
            </Grid>
            <Grid>
              <Skeleton skeletonType="product" />
            </Grid>
            {!isLgTablet && (
              <Grid>
                <Skeleton skeletonType="product" />
              </Grid>
            )}
            {isDesktop && (
              <>
                <Grid>
                  <Skeleton skeletonType="product" />
                </Grid>
                <Grid>
                  <Skeleton skeletonType="product" />
                </Grid>
              </>
            )}

          </Grid>
        </Container>
      ) : (topProducts.length > 0 && (
        <ListItems
          title={t('homePage.ourTopDishes')}
          items={topProducts}
          itemComponent={ProductCardItem}
          actions={<ListItemAction />}
        />
      ))}
      <SwiperReview />
    </>
  );
};

export default memo(HomePage);
