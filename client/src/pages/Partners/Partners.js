import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import PartnersCard from '../../components/PartnersCard/PartnersCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import ListItems from '../../components/ListItems/ListItem';
import { fixedDecodeURIComponent } from '../../utils/uriEncodeHelpers';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import getChangedString from '../../utils/getChangedString';
import { instance } from '../../API/instance';

const PartnersPage = () => {
  const { partnersName } = useParams();
  const [products, setProducts] = useState([]);

  const nameOfPartners = fixedDecodeURIComponent(partnersName);
  const title = getChangedString(nameOfPartners);

  const getData = async () => {
    try {
      const { data } = await instance.get(`/products/filter?restaurant_name=${title}`);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const products = useSelector((state) => state.products.products, shallowEqual);

  // const allProductsOfRest = products.filter((item) => {
  //   return item.restaurant_name.toLowerCase() === nameOfPartners;
  // });
  // console.log(allProductsOfRest);

  // const title = getChangedString(nameOfPartners);

  return (
    <Box>
      <PartnersCard partnersName={partnersName} />
      <ListItems title={`${title} Dishes`} items={products} itemComponent={ProductCardItem} actions={null} />
      <QuestionsList />
    </Box>
  );
};

export default PartnersPage;
