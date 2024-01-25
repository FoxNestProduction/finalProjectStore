import React, { memo, useEffect } from 'react';
import { Container, Typography, Box, useMediaQuery, Grid, Button } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListItems from '../../../components/ListItems/ListItem';
import Skeleton from '../../../components/Skeleton/Skeleton';
import AdminProductCardItem from '../../components/AdminProductCardItem/AdminProductCardItem';
import {
  mainContainer,
  mainTitle,
  errorMessage,
} from '../commonStyles';
import ItemsEditor from '../../components/ItemsEditor/ItemsEditor';
import useGetAPI from '../../../customHooks/useGetAPI';
import { addProductBtn } from './styles';
import { deletePartnerError, fetchGetPartner } from '../../../redux/slices/partnersSlice';
import { gridStylesContainer } from '../../../components/ListItems/styles';
import { fetchFilteredPartnerProducts } from '../../../redux/slices/filterSlice';
import AdminSearch from '../../components/AdminSearch/AdminSearch';

const EditPartnerPage = () => {
  const { customId } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const partnerLoading = useSelector((state) => state.partners.loading);
  const partner = useSelector((state) => state.partners.currentEditingPartner);
  const error = useSelector((state) => state.partners.error);
  const loadingProducts = useSelector((state) => state.products.loading);
  const nothingFound = useSelector((state) => state.filter.nothingFound);
  const filteredProductsQuantity = useSelector((state) => state.filter.productsQuantity);
  const isLgTablet = useMediaQuery('(min-width: 690px)');
  const isDesktop = useMediaQuery('(min-width: 993px)');

  useEffect(() => {
    dispatch(fetchGetPartner(customId));
    return () => {
      dispatch(deletePartnerError());
    };
  }, [dispatch, customId]);

  const restourauntProducts = useSelector((state) => state.filter.filteredPartnerProducts, shallowEqual); // eslint-disable-line
  const restourauntOneProduct = useSelector((state) => state.filter.filteredProduct, shallowEqual); // eslint-disable-line
  const sortBy = useSelector((state) => state.filter.filterParams.sort); // eslint-disable-line
  console.log(sortBy);

  useEffect(() => {
    dispatch(fetchFilteredPartnerProducts(partner?.name));
  }, [dispatch, partner]);

  let showProducts;
  if (sortBy === 'all' || sortBy === '') {
    showProducts = restourauntProducts;
  }
  if (sortBy === 'active') {
    showProducts = restourauntProducts.filter((item) => {
      return item.enabled === true;
    });
  }
  if (sortBy === 'disabled') {
    showProducts = restourauntProducts.filter((item) => {
      return item.enabled === false;
    });
  }

  if (error) {
    return (
      <Container sx={{ ...mainContainer, mt: '80px', mb: '150px' }}>
        <Typography variant="h2" component="h1" sx={errorMessage}>
          Sorry...
        </Typography>
        <Typography variant="h2" component="h1" sx={errorMessage}>
          {error.message}
        </Typography>
      </Container>
    );
  }
  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        {partner?.name}
      </Typography>
      {partnerLoading ? <Typography>Loading...</Typography> : partner && <ItemsEditor type="partner" />}
      {/* todo: додати search + select(all/active/disabled) + restaurant dishes */}
      <Box sx={{ mt: 5 }}>
        <Grid sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', gridTemplateColumns: 'repeat(2,1fr)', p: '0 90px', mb: '10px' }}>

          <AdminSearch items={restourauntProducts} type="food" />

          <Button component={NavLink} to={`${pathname}/dishes/new-dish`} sx={addProductBtn}>
            {isLgTablet && <Typography mr={1}>Add new porduct</Typography>}
            <AddCircleOutlineIcon />
          </Button>

        </Grid>

        {loadingProducts ? (
          <>
            <Typography variant="h2" component="h2" color="text.primary" sx={{ textAlign: 'center', mb: 3 }}>
              Restaurant Dishes
            </Typography>
            <Container sx={{ mb: 13 }}>
              <Box sx={gridStylesContainer}>
                <Skeleton skeletonType="product" />
                <Skeleton skeletonType="product" />
                {isLgTablet && <Skeleton skeletonType="product" />}
                {isDesktop && (
                  <>
                    <Skeleton skeletonType="product" />
                    <Skeleton skeletonType="product" />
                  </>
                )}
              </Box>
            </Container>
            <Container sx={{ mb: 13 }}>
              <Box sx={gridStylesContainer}>
                <Skeleton skeletonType="product" />
                <Skeleton skeletonType="product" />
                {isLgTablet && <Skeleton skeletonType="product" />}
                {isDesktop && (
                  <>
                    <Skeleton skeletonType="product" />
                    <Skeleton skeletonType="product" />
                  </>
                )}
              </Box>
            </Container>
            <Container sx={{ mb: 13 }}>
              <Box sx={gridStylesContainer}>
                <Skeleton skeletonType="product" />
                <Skeleton skeletonType="product" />
                {isLgTablet && <Skeleton skeletonType="product" />}
                {isDesktop && (
                  <>
                    <Skeleton skeletonType="product" />
                    <Skeleton skeletonType="product" />
                  </>
                )}
              </Box>
            </Container>
            {!isLgTablet && !isDesktop ? (
              <>
                <Container sx={{ mb: 13 }}>
                  <Box sx={gridStylesContainer}>
                    <Skeleton skeletonType="product" />
                    <Skeleton skeletonType="product" />
                  </Box>
                </Container>
                <Container sx={{ mb: 13 }}>
                  <Box sx={gridStylesContainer}>
                    <Skeleton skeletonType="product" />
                    <Skeleton skeletonType="product" />
                  </Box>
                </Container>
              </>
            ) : null}
          </>
        ) : restourauntOneProduct.length !== 0 ? (
          <ListItems
            title="Search Dish"
            items={restourauntOneProduct}
            itemComponent={AdminProductCardItem}
            actions={null}
            type="food"
            admin
            itemsFrom="allDishes"
          />
        ) : !nothingFound ? (
          <ListItems
            title={`Restaurant Dishes (${filteredProductsQuantity})`}
            items={showProducts}
            itemComponent={AdminProductCardItem}
            actions={null}
            type="food"
            admin
            pagination
            sorting
            itemsFrom="allDishes"
          />
        ) : (
          <Container sx={{ pb: '60px' }}>
            <Typography
              variant="h3"
              component="p"
              color="primary.main"
              sx={{
                textAlign: 'center',
                fontSize: { mobile: '22px', tablet: '26px', desktop: '32px' },
                px: '10px',
                fontWeight: 'fontWeightLight',
              }}
            >
              Sorry, no one dishes on this restouraunt...🤷‍♀️
            </Typography>
          </Container>
        )}
      </Box>
    </Container>
  );
};

export default memo(EditPartnerPage);
