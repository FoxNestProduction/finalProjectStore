import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import PartnersCard from '../../components/PartnersCard/PartnersCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import { instance } from '../../API/instance';
import useGetAPI from '../../customHooks/useGetAPI';

const PartnersPage = () => {
  const { customId } = useParams();
  const { partnersName } = useParams();

  const [products, setProducts] = useState([]);

  const [partner, loading, error] = useGetAPI(`/partners/${customId}`);

  const title = partner ? partner.name : '';

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await instance.get(`/products/filter?restaurant_name=${title}`);
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [title]);

  return (
    <Box>
      <PartnersCard partner={partner} />
      <ListItems title={`${title} Dishes`} items={products} itemComponent={ProductCardItem} actions={null} />
      <QuestionsList />
    </Box>
  );
};

export default PartnersPage;
