import React, { useState } from 'react';
import { Popover, Button, Typography } from '@mui/material';

const MiniCart = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        aria-describedby={id}
      >
        Open Minicart
      </Button>
      <Popover
        id={id}
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography>Content of Popover</Typography>
        <Typography>Content of Popover 2</Typography>
        <Typography>Content of Popover 3</Typography>
      </Popover>
    </div>
  );
};

export default MiniCart;
