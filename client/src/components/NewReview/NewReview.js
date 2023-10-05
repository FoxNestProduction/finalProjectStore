import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

const NewReview = () => {
  const [value, setValue] = useState();
  return (
    <>
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
      <Stack direction="row" color="primary.main" sx={{ pt: 2 }}>
        <Typography component="legend">You can rate the service</Typography>
        <Rating
          name="simple-controlled"
          label="You can rate the service"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Stack>
    </>
  );
};

export default NewReview;
