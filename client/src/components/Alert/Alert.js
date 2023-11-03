import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const CustomAlert = ({ type, handleCloseAlert }) => {
  // const [info, setInfo] = useState(true);

  return (
    <Stack sx={{ width: '50%', position: 'absolute', bottom: '5px', left: '55px' }} spacing={2}>
      {/* <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert —
        {' '}
        <strong>check it out!</strong>
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert —
        {' '}
        <strong>check it out!</strong>
      </Alert>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert —
        {' '}
        <strong>check it out!</strong>
      </Alert>
      <Alert onClose={() => {}} severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert —
        {' '}
        <strong>check it out!</strong>
      </Alert> */}
      <Alert onClose={handleCloseAlert} severity={type}>
        <AlertTitle>{type}</AlertTitle>
        This is a
        {' '}
        { type }
        {' '}
        alert —
        {' '}
        <strong>check it out!</strong>
      </Alert>
    </Stack>
  );
};

CustomAlert.propTypes = {
  type: PropTypes.string,
  handleCloseAlert: PropTypes.func,
};

CustomAlert.defaultProps = {
  type: 'success',
  handleCloseAlert: () => {},
};

export default CustomAlert;
