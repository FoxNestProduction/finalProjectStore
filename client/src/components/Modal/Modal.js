import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  setTextField,
  setDialogContentText,
  openModal,
  closeModal,
} from '../../redux/slices/modalSlice';

const Modal = ({ disagree, agree }) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const review = useSelector((state) => state.modal.isTextField);
  const warning = useSelector((state) => state.modal.isDialogContentText);
  const title = useSelector((state) => state.modal.title);

  // const [open, setOpen] = useState(false);

  const handleOpenModalWarning = () => {
    dispatch(setDialogContentText());
    dispatch(openModal());
    // setOpen(true);
  };

  const handleOpenModalReview = () => {
    dispatch(openModal());
    dispatch(setTextField());
    console.log(review);
    console.log(warning);
    // setOpen(true);
  };

  const handleClose = () => {
    dispatch(closeModal());
    // setOpen(false);
  };

  const handleRemoveItemCart = () => {
    dispatch(closeModal());
    // setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenModalWarning}>
        Open modal with warning text
      </Button>
      <Button variant="standard" onClick={handleOpenModalReview}>
        Open modal with review
      </Button>
      <Dialog
        open={isOpen}
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
          {warning
          && (
          <DialogContentText>
            Do you confirm that the selected item will be removed from the
            order?
          </DialogContentText>
          )}
          {review
          && (
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="review"
            label="leave your feedback about the service"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
          />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ px: 1 }}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            { disagree }
          </Button>
          <Button
            sx={{ px: 1 }}
            variant="contained"
            color="success"
            onClick={handleRemoveItemCart}
            autoFocus
          >
            { agree }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Modal.propTypes = {
  disagree: PropTypes.string,
  agree: PropTypes.string,
};

Modal.defaultProps = {
  disagree: 'Close',
  agree: 'Remove',
};

export default Modal;
