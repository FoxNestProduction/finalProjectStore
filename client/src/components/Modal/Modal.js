import React from 'react';
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
  setTitle,
  setContent,
  setButtonAgree,
} from '../../redux/slices/modalSlice';

const Modal = ({ disagree }) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const review = useSelector((state) => state.modal.isTextField);
  const warning = useSelector((state) => state.modal.isDialogContentText);
  const title = useSelector((state) => state.modal.title);
  const content = useSelector((state) => state.modal.content);
  const agree = useSelector((state) => state.modal.buttonAgree);
  console.log(content);
  const handleOpenModalWarning = () => {
    dispatch(setDialogContentText());
    dispatch(openModal());
    dispatch(setTitle('Are you sure you want to remove the product?'));
    dispatch(setContent('Do you confirm that the selected item will be removed from the order?'));
    dispatch(setButtonAgree('delete'));
  };

  const handleOpenModalReview = () => {
    dispatch(setTextField());
    dispatch(openModal());
    dispatch(setTitle('Feedback about the service will help us work even better:'));
    dispatch(setButtonAgree('send'));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemoveItemCart = () => {
    dispatch(closeModal());
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
            color: review ? 'success' : 'error',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', minHeight: '12vh' }}>
          {warning
          && (
          <DialogContentText>
            {content}
            {console.log(content)}
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
            {agree}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Modal.propTypes = {
  disagree: PropTypes.string,
};

Modal.defaultProps = {
  disagree: 'Close',
};

export default Modal;
