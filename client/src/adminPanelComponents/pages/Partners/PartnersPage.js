import { Box, Typography, Container, Stack, Autocomplete } from '@mui/material';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Filter from '../../../components/Filter/Filter';
import SectionSwipperFilterSearch from '../../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';
import { fetchAllPartnersNames } from '../../../redux/slices/partnersSlice';

const PartnersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPartnersNames());
  }, [dispatch]);

  const allPartnersNames = useSelector((state) => state.partners.allPartnersNames, shallowEqual);
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Stack>
          <Autocomplete
            options={allPartnersNames}
            onInputChange={() => { }}
          />
        </Stack>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              mobile: '48px',
            },
          }}
        >
          Partners
        </Typography>
      </Box>
    </Container>
  );
};

export default PartnersPage;
