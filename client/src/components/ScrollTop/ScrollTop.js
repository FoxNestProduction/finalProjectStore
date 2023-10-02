import React from 'react';
import { useScrollTrigger } from '@mui/material';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 18, right: 18 }}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollTop;
