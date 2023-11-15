import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
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
import { setAuthorizationError, setRegistrationError } from '../../redux/slices/errorSlice';

const Modal = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const title = useSelector((state) => state.modal.title);
  const content = useSelector((state) => state.modal.content);
  const buttonAgree = useSelector((state) => state.modal.buttonAgree);
  const buttonBox = useSelector((state) => state.modal.buttonBox);

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(setAuthorizationError(''));
    dispatch(setRegistrationError(''));
  };

  return (
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
      {title && (
      <DialogTitle
        sx={{
          textAlign: 'center',
          bgcolor: 'primary.main',
          color: 'text.primaryLight',
          mb: 5,
        }}
      >
        {title}
      </DialogTitle>
      )}
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
          Close
        </Button>
        <Button
          sx={{ px: 1 }}
          variant="contained"
          endIcon={buttonAgree.endIcon && <SendIcon />}
          startIcon={buttonAgree.startIcon && <DeleteIcon />}
          onClick={buttonAgree.onClick}
          disabled={buttonAgree.disabled}
          autoFocus
        >
          {buttonAgree.text}
        </Button>
      </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
