import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router';
import { Container, Box, useMediaQuery } from '@mui/material';
import PartnersCard from '../../components/PartnersCard/PartnersCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import useGetAPI from '../../customHooks/useGetAPI';
import Skeleton from '../../components/Skeleton/Skeleton';
import dishesWraper from './styles';

const PartnersPage = () => {
  const { customId } = useParams();

  const [title, setTitle] = useState('');

  const [partner, partnerLoading] = useGetAPI(`/partners/${customId}`);

  const [productsOfRest, productsLoading] = useGetAPI(`/products/filter?restaurant_name=${title}`);

  const isDesktop = useMediaQuery('(min-width: 993px)');

  useEffect(() => {
    if (partner) {
      setTitle(partner.name);
    }
  }, [partner]);

  return (
    <Box>
      {partnerLoading ? (
        <Container
          component="section"
          sx={{
            bgcolor: 'background.default',
            mt: { mobile: 5, tablet: 8 },
            mb: { mobile: 5, tablet: 8 },
          }}
        >
          <Skeleton skeletonType="oneRestaurantPage" />
        </Container>
      ) : (
        <PartnersCard partner={partner} />
      )}
      {productsLoading ? (
        <Container sx={{ mb: 13 }}>
          <Box sx={dishesWraper}>
            <Box sx={{ width: '100%' }}>
              <Skeleton skeletonType="product" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Skeleton skeletonType="product" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Skeleton skeletonType="product" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Skeleton skeletonType="product" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Skeleton skeletonType="product" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Skeleton skeletonType="product" />
            </Box>
            {isDesktop && (
              <>
                <Box sx={{ width: '100%' }}>
                  <Skeleton skeletonType="product" />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Skeleton skeletonType="product" />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Skeleton skeletonType="product" />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Skeleton skeletonType="product" />
                </Box>
              </>
            )}
          </Box>
        </Container>
      ) : (
        <ListItems title={`${title} Dishes`} items={productsOfRest?.products ? productsOfRest.products : []} itemComponent={ProductCardItem} actions={null} />
      )}
      <QuestionsList />
    </Box>
  );
};

export default memo(PartnersPage);
