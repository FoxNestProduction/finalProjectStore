import React, { createElement } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { gridStylesItem, gridStylesContainer } from './styles';

const ListItems = ({ title, items, itemComponent, actions }) => {
  return (
    <Container sx={{ mb: 13 }}>
      <Typography
        variant="h2"
        component="h2"
        color="text.primary"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        {title}
      </Typography>
      <Grid container spacing={0} sx={gridStylesContainer}>

        { items && items.map((item) => (
          // eslint-disable-next-line dot-notation
          <Grid key={item['_id']} item sx={gridStylesItem}>

            {createElement(itemComponent, { ...item })}
          </Grid>
        ))}
      </Grid>
      {actions}
    </Container>
  );
};

ListItems.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.object,
  items: PropTypes.array,
  itemComponent: PropTypes.func,
};

ListItems.defaultProps = {
  title: '',
  actions: {},
  items: [],
  itemComponent: () => {},
};

export default ListItems;
