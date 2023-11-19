import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SuccessfulLetter = () => {
  return (
    <Box sx={{ px: 3, pb: 4, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '560px' }}>
      <Box>
        <img src="./img/sendMail.svg" alt="send mail" />
        {/* <img src="./img/sendMail_1.svg" alt="send mail" /> */}
      </Box>
      <Typography variant="h3" color="primary.main">
        An email with a link has been sent to your email
      </Typography>
      <Typography variant="body3">
        Open this email and click on the link to change your password
      </Typography>
      <Typography sx={{ fontSize: '6px', color: 'text.secondaryGray', fontStyle: 'italic' }}>
        If you did not receive the message, check the spam folder and whether
        the email address is correct and try to send the request again.
      </Typography>
      <Typography variant="body5" color="primary.main">
        The link will only be active for 15 minutes ...
      </Typography>
    </Box>
  );
};

export default memo(SuccessfulLetter);
