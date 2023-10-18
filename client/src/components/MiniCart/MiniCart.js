import React from 'react';
import { Popover, Button } from '@mui/material';

const MiniCart = () => {
  return (
    <div>
      <Button variant="contained" onClick={() => { }}>
        Open Minicart
      </Button>
      <Popover>
        Content of Popover
      </Popover>
    </div>
  );
};

export default MiniCart;
