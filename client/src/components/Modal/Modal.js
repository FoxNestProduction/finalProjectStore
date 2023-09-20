import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

const Modal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveItemCart = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Click me
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            pt: 5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '16px',
          }}
        >
          Are you sure you want to remove the product?
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', minHeight: '12vh' }}>
          <DialogContentText>
            Do you confirm that the selected item will be removed from the
            order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ px: 1 }}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button
            sx={{ px: 1 }}
            variant="contained"
            color="success"
            onClick={handleRemoveItemCart}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
