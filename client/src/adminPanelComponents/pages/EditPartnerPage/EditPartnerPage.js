import React, { memo } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router';
import {
  mainContainer,
  mainTitle,
} from '../commonStyles';
import ItemsEditor from '../../ItemsEditor/ItemsEditor';
import useGetAPI from '../../../customHooks/useGetAPI';

const EditPartnerPage = () => {
  const { partnerId } = useParams();
  const [partner, partnerLoading] = useGetAPI(`/partners/${partnerId}`);

  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        Partner
      </Typography>
      {partnerLoading
        ? (<Typography>Loading...</Typography>)
        : (partner && <ItemsEditor entity={partner} type="restaurant" />)}
      {/* todo: додати search + select(all/active/disabled) + restaurant dishes */}
    </Container>
  );
};

export default memo(EditPartnerPage);
