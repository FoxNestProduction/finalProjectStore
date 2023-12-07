import React, { memo } from 'react';
import { Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  mainContainer,
  mainTitle,
} from './styles';
import ItemsEditor from '../ItemsEditor/ItemsEditor';

const EditPage = ({ title }) => {
  return (
    <Container sx={mainContainer}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        {title}
      </Typography>
      <ItemsEditor />
    </Container>
  );
};

EditPage.propTypes = {
  title: PropTypes.string,
};

EditPage.defaultProps = {
  title: 'Partner',
};

export default memo(EditPage);
