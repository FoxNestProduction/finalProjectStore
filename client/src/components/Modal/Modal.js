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
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {
  setTextField,
  setDialogContentText,
  openModal,
  closeModal,
  setTitle,
  setTextContent,
  setButtonAgree,
} from '../../redux/slices/modalSlice';

const Modal = ({ disagree }) => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const review = useSelector((state) => state.modal.isTextField);
  const warning = useSelector((state) => state.modal.isDialogContentText);
  const title = useSelector((state) => state.modal.title);
  const textContent = useSelector((state) => state.modal.textContent);
  const buttonAgree = useSelector((state) => state.modal.buttonAgree);

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
    dispatch(setDialogContentText());
    dispatch(openModal());
    dispatch(setTitle('Are you sure you want to remove the product?'));
    dispatch(setTextContent('Do you confirm that the selected item will be removed from the order?'));
    dispatch(setButtonAgree({
      text: 'delete',
      startIcon: true,
      onClick: handleRemoveItemCart,
    }));
  };
  console.log(textContent);
  const handleOpenModalReview = () => {
    dispatch(setTextField());
    dispatch(openModal());
    dispatch(setTitle('Feedback about the service will help us work even better:'));
    dispatch(setButtonAgree({
      text: 'send',
      endIcon: true,
      onClick: handleSendFeedback,
    }));
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
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', minHeight: '12vh' }}>
          {warning
          && (
            <DialogContentText>
              {textContent}
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
          />
          )}
        </DialogContent>
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
