import React, { memo } from 'react';
import { useScrollTrigger } from '@mui/material';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1500,
          '& .MuiButtonBase-root': {
            backgroundColor: 'primary.main',
          },
          '&:hover .MuiButtonBase-root': {
            backgroundColor: 'primary.hover',
          },
        }}
      >
        <Fab size="small" aria-label="scroll back to top" sx={{ color: 'text.primaryLight' }}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
};

export default memo(ScrollTop);
