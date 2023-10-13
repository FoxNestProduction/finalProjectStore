import React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import PartnersCard from '../../components/PartnersCard/PartnersCard';
import QuestionsList from '../../components/QuestionsList/QuestionsList';

const PartnersPage = () => {
  const { partnersName } = useParams();

  return (
    <Box>
      <PartnersCard partnersName={partnersName} />
      <QuestionsList />
    </Box>
  );
};

export default PartnersPage;
