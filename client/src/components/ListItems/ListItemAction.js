import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
import { actionsStyle } from './styles';
import ArrowIcon from '../../assets/svgComponents/ArrowIcon';

const ListItemAction = () => {
  return (
    <>
      <Link
        underline="none"
        href="/Menu"
        color="text.secondaryGray"
        sx={actionsStyle}
      >
        <Typography
          variant="body4"
          component="p"
        >
          View All
        </Typography>
        <ArrowIcon />
      </Link>
      <Divider sx={{ paddingTop: '67px' }} />
    </>
  );
};

export default ListItemAction;
