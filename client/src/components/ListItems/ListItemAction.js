import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import { actionsStyle, linkStyles } from './styles';
import ArrowIcon from '../../assets/svgComponents/ArrowIcon';

const ListItemAction = () => {
  return (
    <>
      <Box
        sx={actionsStyle}
      >
        <Link
          underline="none"
          href="/restaurants"
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
      <Divider sx={{ marginTop: '67px' }} />
    </>
  );
};

export default ListItemAction;
