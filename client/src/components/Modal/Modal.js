import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import {
  openModal,
  closeModal,
  setTitle,
  setContent,
  setButtonAgree,
  addButtonBox,
} from '../../redux/slices/modalSlice';
import LoginForm from '../forms/LoginForm/LoginForm';

const Modal = ({ disagree }) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const title = useSelector((state) => state.modal.title);
  const content = useSelector((state) => state.modal.content);
  const buttonAgree = useSelector((state) => state.modal.buttonAgree);
  const buttonBox = useSelector((state) => state.modal.buttonBox);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemoveItemCart = () => {
    dispatch(closeModal());
  };

  const handleSendFeedback = () => {
    dispatch(closeModal());
  };

  const handleOpenModalWarning = () => {
    dispatch(openModal());
    dispatch(setTitle('Are you sure you want to remove the product?'));
    dispatch(setContent(
      <DialogContentText>
        Do you confirm that the selected item will be removed from the order?
      </DialogContentText>,
    ));
    dispatch(setButtonAgree({
      text: 'delete',
      startIcon: true,
      onClick: handleRemoveItemCart,
    }));
  };
  dispatch(addButtonBox(true));

  const handleOpenModalReview = () => {
    dispatch(openModal());
    dispatch(setTitle('Feedback about the service will help us work even better:'));
    dispatch(setContent(
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
      />,
    ));
    dispatch(setButtonAgree({
      text: 'send',
      endIcon: true,
      onClick: handleSendFeedback,
    }));
    dispatch(addButtonBox(true));
  };

  const handleOpenModalLogin = () => {
    dispatch(openModal());
    // dispatch(setTitle(<IconButton><CloseIcon /></IconButton>));
    dispatch(setContent(<LoginForm />));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenModalWarning}>
        Open modal with warning text
      </Button>
      <Button variant="standard" onClick={handleOpenModalReview}>
        Open modal with review
      </Button>
      <Button variant="outlined" onClick={handleOpenModalLogin}>
        Open modal with LogIn
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <IconButton
          sx={{
            ml: 'auto',
            color: 'primary.main',
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{
            textAlign: 'center',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', minHeight: '12vh' }}>
          {content}
        </DialogContent>
        {buttonBox && (
        <DialogActions>
          <Button
            sx={{ px: 1 }}
            variant="outlined"
            onClick={handleClose}
          >
            { disagree }
          </Button>
          <Button
            sx={{ px: 1 }}
            variant="contained"
            endIcon={buttonAgree.endIcon && <SendIcon />}
            startIcon={buttonAgree.startIcon && <DeleteIcon />}
            onClick={buttonAgree.onClick}
            autoFocus
          >
            {buttonAgree.text}
          </Button>
        </DialogActions>
        )}
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
