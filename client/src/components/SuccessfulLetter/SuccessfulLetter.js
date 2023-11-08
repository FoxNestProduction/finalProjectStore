import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SuccessfulLetter = () => {
  return (
    <Box sx={{ px: 3, pb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <img src="./img/sendMail_1.svg" alt="send mail" />
      </Box>
      <Typography variant="h3" sx={{ color: 'primary.main' }}>
        An email with a link has been sent to your email
      </Typography>
      <Typography variant="body4">
        Open this email and click on the link to change your password
      </Typography>
      <Typography variant="body5" color="text.secondaryGray" fontStyle="italic">
        The link will only be active for 15 minutes ...
      </Typography>
    </Box>
  );
};

export default SuccessfulLetter;
