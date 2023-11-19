import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { actionsStyle, linkStyles } from './styles';
import ArrowIcon from '../../assets/svgComponents/ArrowIcon';

const ListItemAction = ({ type }) => {
  return (
    <Box
      sx={actionsStyle}
    >
      <Link
        component={RouterLink}
        underline="none"
        to={type === 'partners' ? '/restaurants' : '/menu'}
        color="text.secondaryGray"
        sx={linkStyles}
      >
        <Typography
          variant="body4"
          component="p"
          sx={{
            lineHeight: {
              mobile: '20px',
              desktop: '24px',
            },
            fontSize: {
              mobile: '14px',
              desktop: '20px',
            },
          }}
        >
          View All
        </Typography>
        <ArrowIcon fill="text.secondaryGray" />
      </Link>
    </Box>
  );
};

ListItemAction.propTypes = {
  type: PropTypes.string,
};

ListItemAction.defaultProps = {
  type: '',
};

export default memo(ListItemAction);
