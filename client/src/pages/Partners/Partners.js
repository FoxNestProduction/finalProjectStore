import React, { useState, useEffect, memo } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import PartnersCard from '../../components/PartnersCard/PartnersCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import useGetAPI from '../../customHooks/useGetAPI';

const PartnersPage = () => {
  const { customId } = useParams();

  const [title, setTitle] = useState('');

  const [partner, partnerLoading, partnerError] = useGetAPI(`/partners/${customId}`);

  const [productsOfRest, productsLoading, productsError] = useGetAPI(`/products/filter?restaurant_name=${title}`);

  useEffect(() => {
    if (partner) {
      setTitle(partner.name);
    }
  }, [partner]);

  return (
    <Box>
      <PartnersCard partner={partner} />
      <ListItems title={`${title} Dishes`} items={productsOfRest?.products ? productsOfRest.products : []} itemComponent={ProductCardItem} actions={null} />
      <QuestionsList />
    </Box>
  );
};

export default memo(PartnersPage);
