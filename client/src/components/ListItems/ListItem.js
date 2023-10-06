import React, { createElement } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { gridStylesRestaurant } from './styles';
import getRandomItems from '../../utils/getRandomItems';
import useBreakpoint from '../../customHooks/useBreakpoint';

const ListItems = ({ title, items, itemComponent, actions, count, gridProps }) => {
  const arrItem = [...items];
  const breakpoint = useBreakpoint();
  const counter = {
    mobile: 3,
    tablet: 2,
    lgTablet: 2,
    desktop: 3,
  };

  console.log(breakpoint);
  const randomItemsArr = getRandomItems(arrItem, counter[breakpoint]);

  return (
    <Container sx={{ mb: 13 }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        {title}
      </Typography>
      <Grid container spacing={3}>

        { randomItemsArr && randomItemsArr.map((item) => (
          // eslint-disable-next-line dot-notation
          <Grid key={item['_id']} item sx={gridStylesRestaurant} {...gridProps}>

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
  count: PropTypes.number,
  gridProps: PropTypes.object,
};

ListItems.defaultProps = {
  title: '',
  actions: {},
  items: [],
  itemComponent: () => {},
  count: 3,
  gridProps: {},
};

export default ListItems;
