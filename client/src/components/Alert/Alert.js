import React, { useState, useEffect, memo } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const CustomAlert = ({ type, content, handleCloseAlert }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [handleCloseAlert]);

  const closeFunction = () => {
    handleCloseAlert();
    setVisible(false);
  };

  const alertStyle = {
    width: { mobile: '270px', tablet: '325px', desktop: '425px' },
    position: 'fixed',
    bottom: '50px',
    left: { mobile: '25px', tablet: '50px' },
    zIndex: '3000',
    transition: 'opacity 1s ease-in-out',
    opacity: visible ? 1 : 0,
  };

  return (
    <Stack sx={alertStyle} spacing={2}>
      <Alert severity={type}>
        <AlertTitle>{type}</AlertTitle>
        <div style={{ overflow: 'hidden' }}>{content}</div>
        <IconButton
          color="inherit"
          size="small"
          onClick={closeFunction}
          sx={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}
        >
          <CloseIcon />
        </IconButton>
      </Alert>
    </Stack>
  );
};

CustomAlert.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string,
  handleCloseAlert: PropTypes.func,
};

CustomAlert.defaultProps = {
  type: '',
  content: '',
  handleCloseAlert: () => {},
};

export default memo(CustomAlert);
