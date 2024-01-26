import React, { memo, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  mainContainer,
  mainTitle,
} from '../commonStyles';
import ItemsEditor from '../../ItemsEditor/ItemsEditor';
import useGetAPI from '../../../customHooks/useGetAPI';
import { fetchGetPartner } from '../../../redux/slices/partnersSlice';
import Skeleton from '../../Skeleton/Skeleton';

const EditPartnerPage = () => {
  const { customId } = useParams();
  const dispatch = useDispatch();

  const partnerLoading = useSelector((state) => state.partners.loading);
  const partner = useSelector((state) => state.partners.currentEditingPartner);

  useEffect(() => {
    dispatch(fetchGetPartner(customId));
  }, [dispatch, customId]);

  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        Partner
      </Typography>
      {partnerLoading
        ? (<Skeleton type="partner" />)
        : (partner && <ItemsEditor type="partner" />)}
      {/* todo: додати search + select(all/active/disabled) + restaurant dishes */}
    </Container>
  );
};

export default memo(EditPartnerPage);
